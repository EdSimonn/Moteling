/** @format */

import React from "react";
import Image from "next/image";

import { h2 } from "../../../public/assets";
import { merriweather } from "@/utils/fonts";

const Footer = () => {
  return (
    <footer data-name='footer' className='text-white'>
      <div className='mx-auto w-full max-w-screen-xl ss:p-10 p-4 py-6 lg:py-8'>
        <p
          className={`flex items-center justify-center mb-12 font-bold text-3xl text-center pt-6`}
        >
          Sign Up For Exclusive <br className='' /> Offers From Us
        </p>
        <div className='flex justify-between w-full p-4 my-14 '>
          <div className='flex items-center w-full mx-auto sm:w-auto'>
            <form className='flex flex-wrap justify-center items-center w-full md:flex-row'>
              <input
                placeholder='Your Name'
                className='bg-white border border-gray-300 text-gray-900 lg:w-96 md:w-60 mb-2 md:mb-0 md:me-4 text-sm rounded-none block w-full p-4 '
              />
              <input
                placeholder='Enter your email'
                className='bg-white border border-gray-300 text-gray-900 lg:w-80 md:w-60 mb-2 md:mb-0 md:me-4 text-sm rounded-none block w-full p-4 '
              />
              <button className='text-white font-medium bg-[#F89500] hover:bg-[#D17E00] rounded text-sm w-full md:w-auto px-5 py-4 text-center'>
                Subscribe Now
              </button>
            </form>
          </div>
        </div>

        <div className='flex flex-col items-center justify-between md:flex-row md:my-36 my-8'>
          <div className='flex flex-col items-center justify-center'>
            <p className='m-8 md:m-8 text-[#F89500]'>Working Hours</p>
            <p className={`${merriweather}`}>Monday – Friday 09:00 – 19:00 </p>
            <p className={`${merriweather}`}>Saturday and Sunday – CLOSED </p>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <p className='m-16 md:m-8'>
              <Image
                priority={true}
                src={h2}
                alt='h1'
                className=' h-22 w-48 '
              />
            </p>
            <p className='text-[#F89500] pb-4'>Have Any Questions? </p>
            <p className={`${merriweather} text-3xl`}>+9090 8080 4044 </p>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <p className='m-8 md:m-8 text-[#F89500]'>Address</p>
            <p className={`${merriweather}`}>
              45 Grand Central Terminl New York
            </p>
            <p className={`${merriweather}`}>CA 90896 United State USA</p>
          </div>
        </div>

        <hr className='my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8' />
        <p className='flex items-center justify-center'>
          Copyright 2024. All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
