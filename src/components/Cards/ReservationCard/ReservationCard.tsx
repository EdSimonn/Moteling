/** @format */

import React from "react";
import Image from "next/image";

import { Dispatch, FC, SetStateAction } from "react";
import { useRouter } from "next/navigation";

import { Booking } from "@/models/booking";
import { MdOutlinePriceChange } from "react-icons/md";
import { MdOutlineDiscount } from "react-icons/md";
import { FaRegCalendar } from "react-icons/fa";
import { RiPriceTagLine } from "react-icons/ri";
import { FaRegClock } from "react-icons/fa";
import { merriweather } from "@/utils/fonts";

type Props = {
  bookingDetails?: Booking[];
  setRoomId: Dispatch<SetStateAction<string | null>>;
};

const ReservationCard: FC<Props> = ({ bookingDetails, setRoomId }) => {
  const router = useRouter();

  return (
    <>
      {bookingDetails?.map((booking) => (
        <div
          key={booking._id}
          className='bg-white p-6 rounded-md mt-6 text-gray-600 hover:text-white hover:bg-[#C4B191] transition-all duration-300 ease-in-out group'
        >
          <div className='flex flex-row gap-4 group'>
            <Image
              priority={true}
              src={booking.hotelRoom.coverImage}
              alt='bi'
              className='h-48 w-48'
            />
            <div className='group-hover:text-white'>
              <h3
                className={`${merriweather}`}
                onClick={() =>
                  router.push(`/rooms/${booking.hotelRoom.slug.current}`)
                }
              >
                {booking.hotelRoom.name}
              </h3>
              <div className='flex items-center gap-2'>
                <RiPriceTagLine className='text-2xl text-[#F89500] group-hover:text-white' />
                <p className='py-[7px] text-sm flex gap-1 '>
                  Unit Price:
                  <p className='bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full'>
                    {booking.hotelRoom.price}
                  </p>
                </p>
              </div>
              <div className='flex items-center gap-2'>
                <MdOutlinePriceChange className='text-2xl text-[#F89500] group-hover:text-white' />
                <p className='py-[7px] text-sm flex gap-1 '>
                  Price:
                  <p className='bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full'>
                    {booking.totalPrice}
                  </p>
                </p>
              </div>
              <div className='flex items-center gap-2'>
                <MdOutlineDiscount className='text-2xl text-[#F89500] group-hover:text-white' />
                <p className='py-[7px] text-sm flex gap-1 '>
                  Discount:
                  <p className='bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full'>
                    {booking.discount}
                  </p>
                </p>
              </div>
              <div className='flex items-center gap-2'>
                <FaRegCalendar className='text-2xl text-[#F89500] group-hover:text-white' />
                <p className='py-[7px] text-sm flex gap-1 '>
                  Days Booked:
                  <p className='bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full'>
                    {booking.numberOfDays}
                  </p>
                </p>
              </div>
              <div className='flex items-center gap-2'>
                <FaRegClock className='text-2xl text-[#F89500] group-hover:text-white' />
                <p className='py-[7px] text-sm flex gap-1 '>
                  Reserved At :
                  <p className='bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full'>
                    {booking._createdAt.split("T")[0]}{" "}
                  </p>
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ReservationCard;
