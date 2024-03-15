/** @format */

import Image from "next/image";
import React from "react";
import { r1 } from "../../../public/assets";
import Accordion from "./ReasonAccordion";
import { pacifico } from "@/utils/fonts";

const Reason = () => {
  return (
    <div className='flex sm:flex-row flex-col items-start justify-evenly text-black bg-[rgb(249,247,244)] py-16'>
      <Image
        className='sm:w-1/2 w-full sm:h-[32rem] md:h-[32rem] lg:h-[34rem] h-[100%] bg-black'
        priority={true}
        src={r1}
        alt={""}
      />
      <div className='sm:w-1/2 w-full h-[100%] flex flex-col'>
        <div className='p-4 px-8'>
          <h3
            className={`${pacifico} ss:text-2xl sm:text-5xl md:text-4xl lg:text-5xl text-2xl my-9 md:-mt-4 mt-4 mb-5 text-secondary`}
          >
            Top Reasons To Stay
          </h3>
          <div className='md:mt-14 mt-4'>
            <Accordion />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reason;
