/** @format */

import { merriweather } from "@/utils/fonts";
import { Dispatch, FC, SetStateAction } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdOutlineCalendarMonth } from "react-icons/md";

type Props = {
  checkinDate: Date | null;
  setCheckinDate: Dispatch<SetStateAction<Date | null>>;
  checkoutDate: Date | null;
  setCheckoutDate: Dispatch<SetStateAction<Date | null>>;
  setAdults: Dispatch<SetStateAction<number>>;
  setNoOfChildren: Dispatch<SetStateAction<number>>;
  calcMinCheckoutDate: () => Date | null;
  price: number;
  discount: number;
  adults: number;
  noOfChildren: number;
  isBooked: boolean;
  handleBookNowClick: () => void;
};

const RoomReservationCta: FC<Props> = (props) => {
  const {
    price,
    discount,
    checkinDate,
    setCheckinDate,
    checkoutDate,
    setCheckoutDate,
    calcMinCheckoutDate,
    setAdults,
    setNoOfChildren,
    adults,
    noOfChildren,
    isBooked,
    handleBookNowClick,
  } = props;

  const discountPrice = price - (price / 100) * discount;

  const calcNoOfDays = () => {
    if (!checkinDate || !checkoutDate) return 0;
    const timeDiff = checkoutDate.getTime() - checkinDate.getTime();
    const noOfDays = Math.ceil(timeDiff / (24 * 60 * 60 * 1000));
    return noOfDays;
  };
  return (
    <div className='max-w p-6 bg-gray-50 shadow'>
      <div className='flex flex-col'>
        <h2 className={`${merriweather} text-2xl font-semibold py-4`}>
          Make A Reservation
        </h2>
        <div className='flex gap-2 '>
          <div className='w-1/2'>
            <label
              htmlFor='check-in-date'
              className='block text-sm font-medium text-gray-900 dark:text-gray-400'
            >
              Arrival Date{" "}
            </label>
            <DatePicker
              selected={checkinDate}
              onChange={(date) => setCheckinDate(date)}
              dateFormat='dd/MM/yyyy'
              minDate={new Date()}
              id='check-in-date'
              className='w-full border text-black border-gray-300 rounded-lg p-2.5 focus:ring-primary focus:border-primary'
            />
          </div>
          <div className='w-1/2'>
            <label
              htmlFor='check-out-date'
              className='block text-sm font-medium text-gray-900 dark:text-gray-400'
            >
              Departure Date
            </label>
            <DatePicker
              selected={checkoutDate}
              onChange={(date) => setCheckoutDate(date)}
              dateFormat='dd/MM/yyyy'
              disabled={!checkinDate}
              minDate={calcMinCheckoutDate()}
              id='check-out-date'
              className='w-full border text-black border-gray-300 rounded-lg p-2.5 focus:ring-primary focus:border-primary'
            >
              <MdOutlineCalendarMonth />
            </DatePicker>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-y-8 mt-4'>
        <div className='w-full'>
          <label
            htmlFor='adults'
            className='block text-sm font-medium text-gray-900 dark:text-gray-400'
          >
            Adults
          </label>
          <select
            id='adults'
            value={adults}
            onChange={(e) => setAdults(+e.target.value)}
            className='w-full border border-gray-300 rounded-lg p-2.5'
          >
            {/* Add your options here */}
            {Array.from({ length: 5 }, (_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>
        <div className='w-full'>
          <label
            htmlFor='children'
            className='block text-sm font-medium text-gray-900 dark:text-gray-400'
          >
            Children
          </label>
          <select
            id='children'
            value={noOfChildren}
            onChange={(e) => setNoOfChildren(+e.target.value)}
            className='w-full border border-gray-300 rounded-lg p-2.5'
          >
            {/* Add your options here */}
            {Array.from({ length: 6 }, (_, index) => (
              <option key={index} value={index}>
                {index}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className='flex flex-col gap-y-4 mt-4'>
        <div className='flex justify-between'>
          <p>Subtotal</p>
          <p>${price}</p>
        </div>
        <div className='flex justify-between'>
          <p>Discount</p>
          <p>-{discount}%</p>
        </div>

        <div className='w-full border-b-2 border-b-secondary my-2' />

        {calcNoOfDays() > 0 ? (
          <div className='flex justify-between'>
            <p className='font-bold'>Total</p>
            <p>${calcNoOfDays() * discountPrice}</p>
          </div>
        ) : (
          <></>
        )}
      </div>

      <button
        disabled={isBooked}
        onClick={handleBookNowClick}
        className='w-full px-5 py-4 mt-6 text-sm rounded-sm font-medium text-white flex justify-center items-center bg-primary hover:bg-primary2'
      >
        {0 ? "Booked" : "Book Now"}
      </button>
    </div>
  );
};

export default RoomReservationCta;
