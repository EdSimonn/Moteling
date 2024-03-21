/** @format */

import React from "react";
import Image from "next/image";

import { FC } from "react";
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
};

const ReservationCard: FC<Props> = ({ bookingDetails }) => {
  const router = useRouter();

  return (
    <>
      {bookingDetails?.map((booking) => (
        <div
          key={booking._id}
          className='bg-white p-6 rounded-md mt-6 text-gray-600 hover:text-white hover:bg-[#C4B191] transition-all duration-300 ease-in-out group'
        >
          <div className='flex flex-col md:flex-row gap-4 group'>
            <Image
              priority={true}
              src={booking.hotelRoom.coverImage.url}
              alt='bi'
              className='md:h-56 md:w-56 w-full h-full cursor-pointer'
              width={150}
              height={150}
              onClick={() =>
                router.push(`/rooms/${booking.hotelRoom.slug.current}`)
              }
            />
            <div className='group-hover:text-white'>
              <h3
                className={`${merriweather} cursor-pointer hover:text-secondary md:text-xl text-lg mb-1`}
                onClick={() =>
                  router.push(`/rooms/${booking.hotelRoom.slug.current}`)
                }
              >
                {booking.hotelRoom.name}
              </h3>
              <div className='flex md:justify-start justify-between items-center'>
                <div className='flex items-center gap-2'>
                  <RiPriceTagLine className='text-2xl text-[#F89500] group-hover:text-white' />
                  <p className='py-[7px] text-sm flex gap-1 '>Unit Price:</p>
                </div>
                <p className='bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full'>
                  {booking.hotelRoom.price}
                </p>
              </div>
              <div className='flex md:justify-start justify-between items-center'>
                <div className='flex items-center gap-2'>
                  <MdOutlinePriceChange className='text-2xl text-[#F89500] group-hover:text-white' />
                  <p className='py-[7px] text-sm flex gap-1 '>Price:</p>
                </div>
                <p className='bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full'>
                  {booking.totalPrice}
                </p>
              </div>
              <div className='flex md:justify-start justify-between items-center'>
                <div className='flex items-center gap-2'>
                  <MdOutlineDiscount className='text-2xl text-[#F89500] group-hover:text-white' />
                  <p className='py-[7px] text-sm flex gap-1 '>Discount:</p>
                </div>
                <p className='bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full'>
                  {booking.discount}
                </p>
              </div>
              <div className='flex md:justify-start justify-between items-center'>
                <div className='flex items-center gap-2'>
                  <FaRegCalendar className='text-2xl text-[#F89500] group-hover:text-white' />
                  <p className='py-[7px] text-sm flex gap-1 '>Days Booked:</p>
                </div>
                <p className='bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full'>
                  {booking.numberOfDays}
                </p>
              </div>
              <div className='flex md:justify-start justify-between items-center'>
                <div className='flex items-center gap-2'>
                  <FaRegClock className='text-2xl text-[#F89500] group-hover:text-white' />
                  <p className='py-[7px] text-sm flex gap-1 '>Reserved At :</p>
                </div>
                <p className='bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full'>
                  {booking._createdAt.split("T")[0]}
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
