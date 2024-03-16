// 
these are all the code linked to my stripe import { NextResponse } from "next/server";
import Stripe from "stripe";

import { createBooking, updateHotelRoom } from "@/libs/apis";

const checkout_session_completed = "checkout.session.completed";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-08-16",
});

export async function POST(req: Request, res: Response) {
  const reqBody = await req.text();
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) return;
    event = stripe.webhooks.constructEvent(reqBody, sig, webhookSecret);
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 500 });
  }

  // load our event
  switch (event.type) {
    case checkout_session_completed:
      const session = event.data.object;
      console.log(session);

      const {
        // @ts-ignore
        metadata: {
          adults,
          checkinDate,
          checkoutDate,
          children,
          hotelRoom,
          numberOfDays,
          user,
          discount,
          totalPrice,
        },
      } = session;

      await createBooking({
        adults: Number(adults),
        checkinDate,
        checkoutDate,
        children: Number(children),
        hotelRoom,
        numberOfDays: Number(numberOfDays),
        discount: Number(discount),
        totalPrice: Number(totalPrice),
        user,
      });

      //   Update hotel Room
      await updateHotelRoom(hotelRoom);

      return NextResponse.json("Booking successful", {
        status: 200,
        statusText: "Booking Successful",
      });

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json("Event Received", {
    status: 200,
    statusText: "Event Received",
  });
}


/** @format */

import { Stripe, loadStripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
    );
  }

  return stripePromise;
};

export const getUserBookingsQuery = groq`*[_type == 'booking' && user._ref == $userId] {
    _id,
    hotelRoom -> {
        _id,
        name,
        slug,
        price,
        coverImage,
    },
    checkinDate,
    checkoutDate,
    numberOfDays,
    adults,
    children,
    totalPrice,
    discount,
    _createdAt,
}`;

export const createBooking = async ({
  adults,
  checkinDate,
  checkoutDate,
  children,
  discount,
  hotelRoom,
  numberOfDays,
  totalPrice,
  user,
}: CreateBookingDto) => {
  const mutation = {
    mutations: [
      {
        create: {
          _type: "booking",
          user: { _type: "reference", _ref: user },
          hotelRoom: { _type: "reference", _ref: hotelRoom },
          checkinDate,
          checkoutDate,
          numberOfDays,
          adults,
          children,
          totalPrice,
          discount,
        },
      },
    ],
  };

  const { data } = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    mutation,
    { headers: { Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}` } }
  );

  return data;
};

import { createClient } from "next-sanity";

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_STUDIO_TOKEN,
  apiVersion: "2021-10-21",
});

export default sanityClient;

/** @format */

import Stripe from "stripe";

import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { getRoom } from "@/libs/apis";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-08-16",
});

type RequestData = {
  checkinDate: string;
  checkoutDate: string;
  adults: number;
  children: number;
  numberOfDays: number;
  hotelRoomSlug: string;
};

export async function POST(req: Request, res: Response) {
  const {
    checkinDate,
    adults,
    checkoutDate,
    children,
    hotelRoomSlug,
    numberOfDays,
  }: RequestData = await req.json();

  if (
    !checkinDate ||
    !checkoutDate ||
    !adults ||
    !hotelRoomSlug ||
    !numberOfDays
  ) {
    return new NextResponse("Please all fields are required", { status: 400 });
  }

  const origin = req.headers.get("origin");

  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse("Authentication required", { status: 400 });
  }

  const userId = session.user.id;
  const formattedCheckoutDate = checkoutDate.split("T")[0];
  const formattedCheckinDate = checkinDate.split("T")[0];

  try {
    const room = await getRoom(hotelRoomSlug);
    const discountPrice = room.price - (room.price / 100) * room.discount;
    const totalPrice = discountPrice * numberOfDays;

    // Create a stripe payment
    const stripeSession = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            product_data: {
              name: room.name,
              images: room.images.map((image) => image.url),
            },
            unit_amount: parseInt((totalPrice * 100).toString()),
          },
        },
      ],
      payment_method_types: ["card"],
      success_url: `${origin}/users/${userId}`,
      metadata: {
        adults,
        checkinDate: formattedCheckinDate,
        checkoutDate: formattedCheckoutDate,
        children,
        hotelRoom: room._id,
        numberOfDays,
        user: userId,
        discount: room.discount,
        totalPrice,
      },
    });

    return NextResponse.json(stripeSession, {
      status: 200,
      statusText: "Payment session created",
    });
  } catch (error: any) {
    console.log("Payment falied", error);
    return new NextResponse(error, { status: 500 });
  }
}

/** @format */

import { defineField } from "sanity";

const booking = {
  name: "booking",
  title: "Booking",
  type: "document",
  fields: [
    defineField({
      name: "user",
      title: "user",
      type: "reference",
      to: [{ type: "user" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "hotelRoom",
      title: "Hotel Room",
      type: "reference",
      to: [{ type: "hotelRoom" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "checkInDate",
      title: "Check-In Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "checkoutDate",
      title: "Check-out Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "numberOfDays",
      title: "Number Of Days",
      type: "number",
      initialValue: 1,
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "discount",
      title: "Discount",
      type: "number",
      initialValue: 0,
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "adults",
      title: "Adults",
      type: "number",
      initialValue: 1,
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "children",
      title: "Children",
      type: "number",
      initialValue: 0,
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "totalPrice",
      title: "Total Price",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
  ],
};

export default booking;
pls help check and fix, cause when i book room, it says successful, but on the stripe dashboard give this response Webhook Error: No signatures found matching the expected signature for payload. Are you passing the raw request body you received from Stripe? 
Learn more about webhook signing and explore webhook integration examples for various frameworks at https://github.com/stripe/stripe-node#webhook-signing

HTTP status code
500 (Internal Server Error)

// Webhook Error: No signatures found matching the expected signature for payload. Are you passing the raw request body you received from Stripe? 
// Learn more about webhook signing and explore webhook integration examples for various frameworks at https://github.com/stripe/stripe-node#webhook-signing

// HTTP status code
// 500 (Internal Server Error)


// /** @format */

// import { NextResponse } from "next/server";
// import Stripe from "stripe";

// import { createBooking, updateHotelRoom } from "@/libs/apis";

// const checkout_session_completed = "checkout.session.completed";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
//   apiVersion: "2023-08-16",
// });

// export async function POST(req: Request, res: Response) {
//   const reqBody = await req.text();
//   const sig = req.headers.get("stripe-signature");
//   const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

//   let event: Stripe.Event;

//   try {
//     if (!sig || !webhookSecret) return;
//     event = stripe.webhooks.constructEvent(reqBody, sig, webhookSecret);
//   } catch (error: any) {
//     return new NextResponse(`Webhook Error: ${error.message}`, { status: 500 });
//   }

//   // load our event
//   switch (event.type) {
//     case checkout_session_completed:
//       const session = event.data.object;
//       console.log(session);

//       const {
//         // @ts-ignore
//         metadata: {
//           adults,
//           checkinDate,
//           checkoutDate,
//           children,
//           hotelRoom,
//           numberOfDays,
//           user,
//           discount,
//           totalPrice,
//         },
//       } = session;

//       await createBooking({
//         adults: Number(adults),
//         checkinDate,
//         checkoutDate,
//         children: Number(children),
//         hotelRoom,
//         numberOfDays: Number(numberOfDays),
//         discount: Number(discount),
//         totalPrice: Number(totalPrice),
//         user,
//       });

//       //   Update hotel Room
//       await updateHotelRoom(hotelRoom);

//       return NextResponse.json("Booking successful", {
//         status: 200,
//         statusText: "Booking Successful",
//       });

//     default:
//       console.log(`Unhandled event type ${event.type}`);
//   }

//   return NextResponse.json("Event Received", {
//     status: 200,
//     statusText: "Event Received",
//   });
// }


// /** @format */

// import { Stripe, loadStripe } from "@stripe/stripe-js";

// let stripePromise: Promise<Stripe | null>;

// export const getStripe = () => {
//   if (!stripePromise) {
//     stripePromise = loadStripe(
//       process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
//     );
//   }

//   return stripePromise;
// };

// export const getUserBookingsQuery = groq`*[_type == 'booking' && user._ref == $userId] {
//     _id,
//     hotelRoom -> {
//         _id,
//         name,
//         slug,
//         price,
//         coverImage,
//     },
//     checkinDate,
//     checkoutDate,
//     numberOfDays,
//     adults,
//     children,
//     totalPrice,
//     discount,
//     _createdAt,
// }`;

// export const createBooking = async ({
//   adults,
//   checkinDate,
//   checkoutDate,
//   children,
//   discount,
//   hotelRoom,
//   numberOfDays,
//   totalPrice,
//   user,
// }: CreateBookingDto) => {
//   const mutation = {
//     mutations: [
//       {
//         create: {
//           _type: "booking",
//           user: { _type: "reference", _ref: user },
//           hotelRoom: { _type: "reference", _ref: hotelRoom },
//           checkinDate,
//           checkoutDate,
//           numberOfDays,
//           adults,
//           children,
//           totalPrice,
//           discount,
//         },
//       },
//     ],
//   };

//   const { data } = await axios.post(
//     `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
//     mutation,
//     { headers: { Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}` } }
//   );

//   return data;
// };

// import { createClient } from "next-sanity";

// const sanityClient = createClient({
//   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
//   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
//   useCdn: process.env.NODE_ENV === "production",
//   token: process.env.SANITY_STUDIO_TOKEN,
//   apiVersion: "2021-10-21",
// });

// export default sanityClient;

// /** @format */

// import Stripe from "stripe";

// import { authOptions } from "@/libs/auth";
// import { getServerSession } from "next-auth";
// import { NextResponse } from "next/server";
// import { getRoom } from "@/libs/apis";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
//   apiVersion: "2023-08-16",
// });

// type RequestData = {
//   checkinDate: string;
//   checkoutDate: string;
//   adults: number;
//   children: number;
//   numberOfDays: number;
//   hotelRoomSlug: string;
// };

// export async function POST(req: Request, res: Response) {
//   const {
//     checkinDate,
//     adults,
//     checkoutDate,
//     children,
//     hotelRoomSlug,
//     numberOfDays,
//   }: RequestData = await req.json();

//   if (
//     !checkinDate ||
//     !checkoutDate ||
//     !adults ||
//     !hotelRoomSlug ||
//     !numberOfDays
//   ) {
//     return new NextResponse("Please all fields are required", { status: 400 });
//   }

//   const origin = req.headers.get("origin");

//   const session = await getServerSession(authOptions);

//   if (!session) {
//     return new NextResponse("Authentication required", { status: 400 });
//   }

//   const userId = session.user.id;
//   const formattedCheckoutDate = checkoutDate.split("T")[0];
//   const formattedCheckinDate = checkinDate.split("T")[0];

//   try {
//     const room = await getRoom(hotelRoomSlug);
//     const discountPrice = room.price - (room.price / 100) * room.discount;
//     const totalPrice = discountPrice * numberOfDays;

//     // Create a stripe payment
//     const stripeSession = await stripe.checkout.sessions.create({
//       mode: "payment",
//       line_items: [
//         {
//           quantity: 1,
//           price_data: {
//             currency: "usd",
//             product_data: {
//               name: room.name,
//               images: room.images.map((image) => image.url),
//             },
//             unit_amount: parseInt((totalPrice * 100).toString()),
//           },
//         },
//       ],
//       payment_method_types: ["card"],
//       success_url: `${origin}/users/${userId}`,
//       metadata: {
//         adults,
//         checkinDate: formattedCheckinDate,
//         checkoutDate: formattedCheckoutDate,
//         children,
//         hotelRoom: room._id,
//         numberOfDays,
//         user: userId,
//         discount: room.discount,
//         totalPrice,
//       },
//     });

//     return NextResponse.json(stripeSession, {
//       status: 200,
//       statusText: "Payment session created",
//     });
//   } catch (error: any) {
//     console.log("Payment falied", error);
//     return new NextResponse(error, { status: 500 });
//   }
// }

// /** @format */

// import { defineField } from "sanity";

// const booking = {
//   name: "booking",
//   title: "Booking",
//   type: "document",
//   fields: [
//     defineField({
//       name: "user",
//       title: "user",
//       type: "reference",
//       to: [{ type: "user" }],
//       validation: (Rule) => Rule.required(),
//     }),
//     defineField({
//       name: "hotelRoom",
//       title: "Hotel Room",
//       type: "reference",
//       to: [{ type: "hotelRoom" }],
//       validation: (Rule) => Rule.required(),
//     }),
//     defineField({
//       name: "checkInDate",
//       title: "Check-In Date",
//       type: "date",
//       validation: (Rule) => Rule.required(),
//     }),
//     defineField({
//       name: "checkoutDate",
//       title: "Check-out Date",
//       type: "date",
//       validation: (Rule) => Rule.required(),
//     }),
//     defineField({
//       name: "numberOfDays",
//       title: "Number Of Days",
//       type: "number",
//       initialValue: 1,
//       validation: (Rule) => Rule.required().min(1),
//     }),
//     defineField({
//       name: "discount",
//       title: "Discount",
//       type: "number",
//       initialValue: 0,
//       validation: (Rule) => Rule.required().min(0),
//     }),
//     defineField({
//       name: "adults",
//       title: "Adults",
//       type: "number",
//       initialValue: 1,
//       validation: (Rule) => Rule.required().min(1),
//     }),
//     defineField({
//       name: "children",
//       title: "Children",
//       type: "number",
//       initialValue: 0,
//       validation: (Rule) => Rule.required().min(0),
//     }),
//     defineField({
//       name: "totalPrice",
//       title: "Total Price",
//       type: "number",
//       validation: (Rule) => Rule.required().min(0),
//     }),
//   ],
// };

// export default booking;
