/** @format */
"use client";

import useSWR from "swr";
import RoomPhotoGallery from "@/components/RoomPhotoGallery/RoomPhotoGallery";
import RoomReservationCta from "@/components/RoomReservationCta/RoomReservationCta";
import React, { useState } from "react";
import { LiaBathSolid } from "react-icons/lia";
import LoadingSpinner from "../../loading";
import { getRoom } from "@/libs/apis";
import toast from "react-hot-toast";
import { getStripe } from "@/libs/stripe";
import axios from "axios";
import RoomReview from "@/components/RoomReview/RoomReview";
import RoomRating from "@/components/RoomRating/RoomRating";

import { FaSwimmingPool } from "react-icons/fa";
import { LuSofa } from "react-icons/lu";
import { LuBath } from "react-icons/lu";
import { LiaTvSolid } from "react-icons/lia";
import { BsSafe2 } from "react-icons/bs";
import { TbAirConditioning } from "react-icons/tb";
import { LuBedDouble } from "react-icons/lu";
import { LiaBicycleSolid } from "react-icons/lia";
import { BiDumbbell } from "react-icons/bi";
import { LuAlignHorizontalSpaceAround } from "react-icons/lu";
import { FaPeopleRoof } from "react-icons/fa6";
import { TbMassage } from "react-icons/tb";
import { MdOutlineAccessAlarm } from "react-icons/md";
import { IoCarSportOutline } from "react-icons/io5";
import { MdOutlineLocalLaundryService } from "react-icons/md";
import { GiWheelbarrow } from "react-icons/gi";
import { GrWifi } from "react-icons/gr";
import { merriweather } from "@/utils/fonts";

const RoomDetailsPage = (props: { params: { slug: string } }) => {
  const {
    params: { slug },
  } = props;

  const [checkinDate, setCheckinDate] = useState<Date | null>(null);
  const [checkoutDate, setCheckoutDate] = useState<Date | null>(null);
  const [adults, setAdults] = useState(1);
  const [noOfChildren, setNoOfChildren] = useState(0);

  const [roomId, setRoomId] = useState<string | null>(null);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [ratingValue, setRatingValue] = useState<number | null>(0);
  const [ratingText, setRatingText] = useState("");

  const reviewSubmitHandler = async () => {
    console.log(ratingText, ratingValue);
    if (!ratingText.trim().length || !ratingValue) {
      return toast.error("Please provide a rating text and a rating");
    }

    // Check if roomId exists
    if (!roomId) {
      return toast.error("Id not provided");
    }

    setIsSubmittingReview(true);

    try {
      const { data } = await axios.post("/api/users", {
        reviewText: ratingText,
        ratingValue,
        roomId,
      });
      console.log(data);
      toast.success("Review Submitted");
    } catch (error) {
      console.log(error);
      toast.error("Review Failed");
    } finally {
      setRatingText("");
      setRatingValue(null);
      setRoomId(null);
      setIsSubmittingReview(false);
    }
  };

  const fetchRoom = async () => {
    const roomData = await getRoom(slug);
    setRoomId(roomData?._id); // Assuming _id is the identifier for the room
    return roomData;
  };

  // const { data: room, error, isLoading } = useSWR("/api/room", fetchRoom);
  const { data: room, error, isLoading } = useSWR("/api/room", fetchRoom);

  if (error) throw new Error("Cannot fetch data");
  if (typeof room === "undefined" && !isLoading)
    throw new Error("Cannot fetch data");

  if (!room) return <LoadingSpinner />;

  const calcMinCheckoutDate = () => {
    if (checkinDate) {
      const nextDay = new Date(checkinDate);
      nextDay.setDate(nextDay.getDate() + 1);
      return nextDay;
    }
    return null;
  };

  const handleBookNowClick = async () => {
    if (!checkinDate || !checkoutDate)
      return toast.error("Tinubu provide correct date");

    if (checkinDate > checkoutDate)
      return toast.error("Abacha choose better checkin period");

    const numberOfDays = calcNumDays();

    const hotelRoomSlug = room.slug.current;

    const stripe = await getStripe();

    try {
      const { data: stripeSession } = await axios.post("/api/stripe", {
        checkinDate,
        checkoutDate,
        adults,
        children: noOfChildren,
        numberOfDays,
        hotelRoomSlug,
      });

      if (stripe) {
        const result = await stripe.redirectToCheckout({
          sessionId: stripeSession.id,
        });

        if (result.error) {
          toast.error("Payment Failed");
        }
      }
    } catch (error) {
      console.log("Error: ", error);
      toast.error("An error occured");
    }
  };

  const calcNumDays = () => {
    if (!checkinDate || !checkoutDate) return;
    const timeDiff = checkoutDate.getTime() - checkinDate.getTime();
    const noOfDays = Math.ceil(timeDiff / (24 * 60 * 60 * 1000));
    return noOfDays;
  };

  return (
    <>
      <div className='mx-auto w-full max-w-screen-xl ss:p-10 p-4 py-6 lg:py-8 bg-[rgb(249,247,244)]'>
        <div className='mb-8 '>
          <h1 className={`${merriweather} text-3xl font-extrabold`}>
            {room.name}
          </h1>
          <hr className='my-3 border-gray-200 sm:mx-auto dark:border-gray-200 lg:my-5' />
          <p className='mb-3 lg:mb-5'>
            from{""}
            <span
              className={`${merriweather} text-[#F89500] text-xl font-bold `}
            >
              {" "}
              ${room.price}
            </span>{" "}
            / night
          </p>

          <RoomPhotoGallery images={room.images} />
        </div>
      </div>

      <div className='mx-auto w-full max-w-screen-xl ss:p-10 p-4 py-6 lg:py-8 bg-white'>
        <div className='md:grid md:grid-cols-12 gap-10'>
          <div className='md:col-span-8 md:w-full'>
            <div className='grid lg:grid-cols-5 md:grid-cols-5 xs:grid-cols-3 grid-cols-2 gap-4 mb-8'>
              {room.offeredAmenities &&
                room.offeredAmenities.map((amenity) => (
                  <div key={amenity._key} className='bg-gray-300 p-4'>
                    <i
                      className={`fa-solid ${amenity.icon} text-4xl text-[#F89500]`}
                    ></i>
                    <p>{amenity.amenity}</p>
                  </div>
                ))}
            </div>

            <div className='mb-8'>
              <h1
                className={`${merriweather} text-xl font-extrabold h-6 border-l-[5px] border-orange-500 pl-4 mb-6`}
              >
                Description
              </h1>

              <p className='text-md font-normal text-gray-600 leading-6 tracking-tight mb-6'>
                {room.description}
              </p>

              <p className='text-md font-normal text-gray-600 leading-6 tracking-tight'>
                Fast WIFI connection, satelite TV and international standard
                electric socket are standard throughout Hotel. Lorem ipsum dolor
                sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat.
              </p>
            </div>

            <div className='mb-8'>
              <h1
                className={`${merriweather} text-xl font-extrabold h-6 border-l-[5px] border-orange-500 pl-4 mb-6`}
              >
                Room Amenities
              </h1>

              <div className='grid lg:grid-cols-3 md:grid-cols-3 xs:grid-cols-3 grid-cols-1  gap-2 mb-8'>
                <div className='flex items-center gap-4'>
                  <LuSofa className=' text-2xl text-[#F89500]' />
                  <p className=''>2 Seater Sofa</p>
                </div>
                <div className='flex items-center gap-4'>
                  <LuBath className=' text-2xl text-[#F89500]' />
                  <p className=''>Bathtub</p>
                </div>
                <div className='flex items-center gap-4'>
                  <FaSwimmingPool className=' text-2xl text-[#F89500]' />
                  <p className=''>Private Pool</p>
                </div>
                <div className='flex items-center gap-4'>
                  <LiaTvSolid className=' text-2xl text-[#F89500]' />
                  <p className=''>40-inch Samsung Led Tv</p>
                </div>
                <div className='flex items-center gap-4'>
                  <GrWifi className=' text-2xl text-[#F89500]' />
                  <p className=''>Free Wi-Fi</p>
                </div>
                <div className='flex items-center gap-4'>
                  <BsSafe2 className=' text-2xl text-[#F89500]' />
                  <p className=''>Safe Deposit</p>
                </div>
                <div className='flex items-center gap-4'>
                  <TbAirConditioning className=' text-2xl text-[#F89500]' />
                  <p className=''>Air Conditioning</p>
                </div>
                <div className='flex items-center gap-4'>
                  <LiaBathSolid className=' text-2xl text-[#F89500]' />
                  <p className=''>2 bathrooms</p>
                </div>
                <div className='flex items-center gap-4'>
                  <LuBedDouble className=' text-2xl text-[#F89500]' />
                  <p className=''>King size bed</p>
                </div>
              </div>
            </div>

            <div className='mb-8'>
              <h1
                className={`${merriweather} text-xl font-extrabold h-6 border-l-[5px] border-orange-500 pl-4 mb-6`}
              >
                Services
              </h1>

              <div className='grid lg:grid-cols-3 md:grid-cols-3 xs:grid-cols-3 grid-cols-1 gap-2 mb-8'>
                <div className='flex items-center gap-4'>
                  <LiaBicycleSolid className='text-2xl text-[#F89500]' />
                  <p className=''>Bicycle Hire</p>
                </div>
                <div className='flex items-center gap-4'>
                  <BiDumbbell className='text-2xl text-[#F89500]' />
                  <p className=''>Fitness Center</p>
                </div>
                <div className='flex items-center gap-4'>
                  <LuAlignHorizontalSpaceAround className='text-2xl text-[#F89500]' />
                  <p className=''>Own Parking Space</p>
                </div>
                <div className='flex items-center gap-4'>
                  <IoCarSportOutline className='text-2xl text-[#F89500]' />
                  <p className=''>Car Hire</p>
                </div>
                <div className='flex items-center gap-4'>
                  <MdOutlineLocalLaundryService className='text-2xl text-[#F89500]' />
                  <p className=''>Laundry</p>
                </div>
                <div className='flex items-center gap-4'>
                  <GiWheelbarrow className='text-2xl text-[#F89500]' />
                  <p className=''>Children play area</p>
                </div>
                <div className='flex items-center gap-4'>
                  <FaPeopleRoof className='text-2xl text-[#F89500]' />
                  <p className=''>Conference Rooms</p>
                </div>
                <div className='flex items-center gap-4'>
                  <TbMassage className='text-2xl text-[#F89500]' />
                  <p className=''>Massage</p>
                </div>
                <div className='flex items-center gap-4'>
                  <MdOutlineAccessAlarm className='text-2xl text-[#F89500]' />
                  <p className=''>Wake-up Call</p>
                </div>
              </div>
            </div>

            <div className='mb-8'>
              <h1
                className={`${merriweather} text-xl font-extrabold h-6 border-l-[5px] border-orange-500 pl-4 mb-6`}
              >
                Additional Information
              </h1>

              <ul className='list-disc pl-12'>
                <li>Room Service</li>
                <li> Balcony / Terrace</li>
                <li>Bathroom Amenities </li>
                <li>Satellite TV</li>
                <li>Video/ DVD/ CD Player Available</li>
                <li>Coffee Table </li>
                <li>Hot / Cold Running Water </li>
                <li>Extra Bed, Towels, Bedding</li>
                <li>Toiletries</li>
                <li> Mineral Water </li>
                <li>Mirror</li>
                <li>Handheld Showers</li>
              </ul>
            </div>

            <div className='mb-8'>
              <h1
                className={`${merriweather} text-xl font-extrabold h-6 border-l-[5px] border-orange-500 pl-4 mb-6`}
              >
                Reviews
              </h1>
              <RoomReview roomId={room._id} />
            </div>
            <div className='mb-8'>
              <h1
                className={`${merriweather} text-xl font-extrabold h-6 border-l-[5px] border-orange-500 pl-4 mb-6`}
              >
                Add a review
              </h1>
              <RoomRating
                ratingValue={ratingValue}
                setRatingValue={setRatingValue}
                ratingText={ratingText}
                setRatingText={setRatingText}
                isSubmittingReview={isSubmittingReview}
                reviewSubmitHandler={reviewSubmitHandler}
              />
            </div>
          </div>

          <div className='md:col-span-4 rounded-xl shadow-lg dark:shadow dark:shadow-white sticky top-10 h-fit overflow-auto'>
            <RoomReservationCta
              discount={room.discount}
              price={room.price}
              checkinDate={checkinDate}
              setCheckinDate={setCheckinDate}
              checkoutDate={checkoutDate}
              setCheckoutDate={setCheckoutDate}
              calcMinCheckoutDate={calcMinCheckoutDate}
              adults={adults}
              noOfChildren={noOfChildren}
              setAdults={setAdults}
              setNoOfChildren={setNoOfChildren}
              isBooked={room.isBooked}
              handleBookNowClick={handleBookNowClick}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomDetailsPage;
