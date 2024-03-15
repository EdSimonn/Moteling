/** @format */

import React, { FC } from "react";
import { Room } from "@/models/room";
import RoomCard from "../Cards/RoomCard/RoomCard";
import { pacifico } from "@/utils/fonts";

type Props = {
  featuredRoom: Room[];
};

const FeaturedRoom: FC<Props> = (props) => {
  const { featuredRoom } = props;

  return (
    <div className='mx-auto w-full max-w-screen-xl ss:p-10 p-4 py-6 lg:py-8'>
      <p
        className={`${pacifico} text-secondary flex items-center justify-center mb-8 font-bold text-5xl text-center pt-6`}
      >
        Rooms & Suites
      </p>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 py-6'>
        {featuredRoom.map((room, index) => (
          <div
            key={index}
            className={`col-span-1 md:col-span-1 lg:col-span-${
              index === 0 ? 2 : 1
            } gap-8`}
          >
            <RoomCard key={room._id} room={room} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedRoom;
