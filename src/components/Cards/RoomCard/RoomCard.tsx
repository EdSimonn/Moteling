/** @format */

import React, { FC } from "react";
import Image from "next/image";
import { Room } from "@/models/room";
import Link from "next/link";
import { merriweather } from "@/utils/fonts";

type Props = {
  room: Room;
};

const RoomCard: FC<Props> = (props) => {
  const {
    room: { coverImage, name, price, type, slug },
  } = props;
  return (
    <div className='group relative col-span-1 md:col-span-1 lg:col-span-2 items-center justify-center overflow-hidden hover:shadow-xl hover:shadow-black/30 transition-shadow'>
      <Image
        priority={true}
        src={coverImage.url}
        alt={name}
        width={500}
        height={300}
        className='object-cover w-full h-[26rem] group-hover:rotate-1 group-hover:scale-125 transition-transform duration-500'
      />
      <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70'></div>
      <div className='absolute inset-0 flex flex-col px-6 py-8 translate-y-[60%] group-hover:translate-y-32 transition-all'>
        <h3
          className={`${merriweather} text-2xl font-bold text-white cursor-pointer tracking-tighter leading-7`}
        >
          {name}
        </h3>
        <p className='text-white text-sm capitalize leading-5'>{type}</p>
        <ul className='my-3 text text-gray-400 opacity-0 group-hover:opacity-100'>
          <li>Room Service</li>
          <li>Balcony / Terrace</li>
          <li>Satellite TV</li>
        </ul>
        <hr className='my-4 border-gray-200 dark:border-gray-400' />
      </div>
      <div className='absolute inset-0 flex items-end justify-between px-6 py-8 text-center text-white'>
        <p>
          from{""}
          <span className='text-[#F89500] text-xl font-bold'> ${price}</span> /
          night
        </p>

        <Link
          href={`/rooms/${slug.current}`}
          className='text-[#F89500] opacity-0 group-hover:opacity-100 cursor-pointer'
        >
          Read more.
        </Link>
      </div>
    </div>
  );
};

export default RoomCard;
