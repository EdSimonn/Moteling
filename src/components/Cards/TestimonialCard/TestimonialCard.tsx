/** @format */

import React from "react";
import Image from "next/image";
import { LiaStarSolid } from "react-icons/lia";

const TestimonialCard = ({ desc, name, img }: any) => {
  return (
    <div className='mx-auto max-w-lg px-10 py-8 lg:py-14 bg-white rounded-sm text-gray-400 hover:text-white hover:bg-[#C4B191] hover:-mt-4 transition-all duration-300 ease-in-out'>
      <div className='flex flex-col'>
        <p className='text-xl leading-7 mb-12'>{desc}</p>

        <div className='flex text-yellow-400 mb-6 text-2xl'>
          <LiaStarSolid />
          <LiaStarSolid />
          <LiaStarSolid />
          <LiaStarSolid />
          <LiaStarSolid />
        </div>

        <div className='flex gap-2 items-center'>
          <Image
            className='rounded-full h-20 w-20 bg-white'
            priority={true}
            src={img}
            alt='img'
            width={400}
            height={400}
          />
          <div className=''>
            <p className='text-md font-semibold'>{name}</p>
            <p className=''>May 10, 2021</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
