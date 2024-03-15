/** @format */
"use client";

import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import { PiCalendarCheckBold } from "react-icons/pi";
import { Hero } from "@/constants";
import { pacifico } from "@/utils/fonts";

const HeroSection = () => {
  return (
    <div>
      <Swiper
        spaceBetween={30}
        autoplay={{
          delay: 5000,
        }}
        effect={"fade"}
        navigation={false}
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        className='mySwiper'
      >
        {Hero.map((heroData, index) => (
          <SwiperSlide key={index}>
            <div className='relative'>
              <Image
                className='w-full lg:h-[100vh] md:h-screen sm:h-screen h-[75vh]'
                priority={true}
                src={heroData.img}
                alt={""}
                width={800}
                height={800}
              />
              <div className='lg:h-[100vh] md:h-screen sm:h-screen h-[75vh] absolute inset-0 bg-gradient-to-br from-black to-black via-transparent'></div>

              <div className='w-full max-w-screen-xl ss:p-10 p-4 py-4 lg:py-6'>
                <div className='absolute text-white top-[30%]'>
                  <p className='text-xl text-[#F89500] mb-6'>
                    {heroData.subTitle}
                  </p>
                  <h1
                    className={`${pacifico} text-2xl ss:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold mb-6`}
                  >
                    {heroData.title}
                  </h1>
                  <button
                    type='button'
                    className='px-6 py-5 text-sm font-medium text-white flex items-center bg-[#F89500] hover:bg-[#D17E00] rounded'
                  >
                    <PiCalendarCheckBold className='w-5 h-5 text-white me-2' />
                    Book Your Stay
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSection;
