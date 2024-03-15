/** @format */

import React from "react";
import { PiCalendarCheckBold } from "react-icons/pi";
import Image from "next/image";
import { a1, a2, a3 } from "../../../public/assets";
import { merriweather } from "@/utils/fonts";

const About = () => {
  return (
    <div className='mx-auto w-full max-w-screen-xl ss:p-10 p-4 py-6 lg:py-8'>
      <section className='flex flex-col sm:flex-row justify-between items-center xs:gap-4 sm:gap-16 gap-0'>
        <div className='flex flex-col items-center'>
          <p className='text-sm text-gray-400 xs:pb-1 sm:pb-2 pb-0 text-center'>
            WELCOME
          </p>
          <h1
            className={`${merriweather} md:text-5xl text-2xl my-4 text-center pt-4 sm:pb-4 pb-0 px-2 md:px-0 font-semibold`}
          >
            Experience the most outstanding luxury hotel of Hoteling
          </h1>
          <p className='text-center pt-2  pb-8 px-2 md:px-0 text-lg'>
            With its elegantly-restored, original Art Deco detail and stately
            accommodations, Hotel Erios is a glowing reflection of Old New York
            in the modern day, set in a prime location just steps from Times
            Square.
          </p>
          <button
            type='button'
            className='px-6 py-5 text-sm font-medium text-white flex items-center bg-[#F89500] hover:bg-[#D17E00]'
          >
            <PiCalendarCheckBold className='w-5 h-5 text-white me-2' />
            Book Your Stay
          </button>
        </div>

        <div className='flex flex-col items-center '>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div className='col-span-2 xs:col-span-1 space-y-5 mt-10'>
              <div className='p-1 hidden sm:block'>
                <Image
                  alt='gallery'
                  className='block md:h-[18rem] sm:h-[12rem] xs:h-[12rem] h-full w-full rounded object-cover object-center'
                  src={a2}
                  width={800} // Increase the width to 400
                  height={200}
                />
              </div>
              <div className='p-1 sm:block xs:block'>
                <Image
                  alt='gallery'
                  className='block md:h-[18rem] sm:h-[12rem] xs:h-[30rem] h-full w-full rounded object-cover object-center'
                  src={a3}
                  width={800} // Increase the width to 400
                  height={200}
                />
              </div>
            </div>
            <div className='p-1 hidden sm:block'>
              <Image
                alt='gallery'
                className='block xs:h-[26rem] md:h-[38rem] w-[52rem] rounded object-cover object-center'
                src={a1}
                width={1000} // Increase the width to 400
                height={200}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
