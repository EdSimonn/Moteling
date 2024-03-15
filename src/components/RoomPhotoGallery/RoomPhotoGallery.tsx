/** @format */
"use client";

import React, { useState } from "react";
import { Image as ImageType } from "@/models/room";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

SwiperCore.use([FreeMode, Navigation, Thumbs]);

type SwiperCallback = (swiper: SwiperCore) => void;

import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";
import { hotelImages } from "@/constants";

const RoomPhotoGallery: React.FC<{ images: ImageType[] }> = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);
  const [mainSwiper, setMainSwiper] = useState<SwiperCore | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);

  const handleMainSlideChange = (swiper: SwiperCore) => {
    setActiveSlideIndex(swiper.activeIndex);
  };

  const handleThumbsSlideChange = (swiper: SwiperCore) => {
    if (mainSwiper) {
      mainSwiper.slideTo(swiper.activeIndex);
    }
  };

  const roomImages = images;

  return (
    <div className='bg-[rgb(249,247,244)] '>
      <Swiper
        loop={true}
        spaceBetween={10}
        autoplay={{
          delay: 5000,
        }}
        navigation={true}
        thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
        modules={[Autoplay, FreeMode, Navigation, Thumbs]}
        onSlideChange={handleMainSlideChange}
        onInit={(swiper) => {
          handleMainSlideChange(swiper);
          setMainSwiper(swiper);
        }}
      >
        {roomImages.map((image, index) => (
          <SwiperSlide key={index}>
            <div
              className={`${
                activeSlideIndex === index ? "brightness-100" : ""
              }`}
            >
              <Image
                priority={true}
                src={image.url}
                alt={`Image ${index + 1}`}
                width={700}
                height={400}
                className='w-full sm:h-[26rem] md:h-[32rem] lg:h-[40rem] h-[100%] object-cover pb-6'
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
      >
        {roomImages.map((image, index) => (
          <SwiperSlide key={index}>
            <div
              className={`${
                activeSlideIndex === index
                  ? "border-[3px] border-primary duration-75 transition-all ease-in-out"
                  : ""
              }`}
            >
              <Image
                priority={true}
                src={image.url}
                alt={`Image ${index + 1}`}
                width={150}
                height={150}
                className='w-full sm:h-24 md:h-32 lg:h-28 h-16'
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default RoomPhotoGallery;
