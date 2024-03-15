/** @format */

import { pacifico } from "@/utils/fonts";
import React from "react";
import { IoAirplaneOutline } from "react-icons/io5";
import { LiaBathSolid } from "react-icons/lia";
import { PiCarSimpleDuotone, PiMartiniDuotone } from "react-icons/pi";

const ExtraService = () => {
  return (
    <div className='mx-auto w-full max-w-screen-xl ss:p-10 p-4 py-6 lg:py-8 '>
      <h1
        className={`${pacifico} flex items-center justify-center mb-12 font-bold text-5xl text-center pt-6 text-white`}
      >
        Extra Services
      </h1>

      <div className='grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 md:gap-12 gap-8 '>
        <div className='bg-[#131120] bg-opacity-50 hover:bg-white p-6 text-white hover:text-black md:py-14 py-10'>
          <p className='pb-7'>
            <IoAirplaneOutline className='text-6xl text-[#F89500]' />
          </p>
          <h3 className='pb-5 text-2xl'>Pick Up & Drop </h3>
          <p className='text-sm leading-6'>
            We’ll pick up from airport while you comfy on your ride.
          </p>
        </div>
        <div className='bg-[#131120] bg-opacity-50 hover:bg-white p-6 text-white hover:text-black md:py-14 py-10'>
          <p className='pb-7'>
            <PiCarSimpleDuotone className='text-6xl text-[#F89500]' />
          </p>
          <h3 className='pb-5 text-2xl'>Parking Space​ </h3>
          <p className='text-sm leading-6'>
            Please consider your private parking or better yet.
          </p>
        </div>
        <div className='bg-[#131120] bg-opacity-50 hover:bg-white p-6 text-white hover:text-black md:py-14 py-10'>
          <p className='pb-7'>
            <PiMartiniDuotone className='text-6xl text-[#F89500]' />
          </p>
          <h3 className='pb-5 text-2xl'>Welcome Drink​ </h3>
          <p className='text-sm leading-6'>
            We have the fuel to start your day right on time.
          </p>
        </div>
        <div className='bg-[#131120] bg-opacity-50 hover:bg-white p-6 text-white hover:text-black md:py-14 py-10'>
          <p className='pb-7'>
            <LiaBathSolid className='text-6xl text-[#F89500]' />
          </p>
          <h3 className='pb-5 text-2xl'>Hot & Cold Water​ </h3>
          <p className='text-sm leading-6'>
            Let us know if you need anything to be more comfortable
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExtraService;
