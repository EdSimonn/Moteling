/** @format */

"use client";

import { getRooms } from "@/libs/apis";
import { Room } from "@/models/room";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

import Filter from "@/components/Filter/Filter";
import RoomCard from "@/components/Cards/RoomCard/RoomCard";
import { pacifico } from "@/utils/fonts";

const Rooms = () => {
  const [roomTypeFilter, setRoomTypeFilter] = useState("");

  const searchParams = useSearchParams();

  useEffect(() => {
    const roomType = searchParams.get("");

    // console.log(roomType);

    if (roomType) setRoomTypeFilter(roomType);
  }, [searchParams]);

  async function fetchData() {
    return getRooms();
  }

  const { data, error, isLoading } = useSWR("get/hotelRoom", fetchData);

  if (error) throw new Error("Cannot fetch Data");
  if (typeof data === "undefined" && !isLoading)
    throw new Error("Cannot fetch Data");

  // console.log(data);

  const filterRooms = (rooms: Room[]) => {
    return rooms.filter((room) => {
      if (
        roomTypeFilter &&
        roomTypeFilter.toLowerCase() !== "all" &&
        room.type.toLowerCase() !== roomTypeFilter.toLowerCase()
      ) {
        return false;
      }

      return true;
    });
  };

  const filteredRooms = filterRooms(data || []);

  return (
    <>
      <div className='w-full h-[100%] bg-banner1 bg-center bg-cover bg-gray-500 bg-blend-multiply'>
        <div className='mx-auto w-full max-w-screen-xl ss:p-10 p-4 py-6 lg:py-8'>
          <div className='max-w-6xl'>
            <h1
              className={`${pacifico} md:text-5xl text-4xl font-bold text-white my-4`}
            >
              Room List
            </h1>
            <p className='text-lg font-serif text-gray-300'>
              Find all our exquisite rooms here
            </p>
          </div>
        </div>
      </div>

      <div className='mx-auto w-full max-w-screen-xl ss:p-10 p-4 py-6 lg:py-8'>
        <div className='mb-6'>
          <div className='flex justify-between items-center'>
            <Filter
              roomTypeFilter={roomTypeFilter}
              setRoomTypeFilter={setRoomTypeFilter}
            />
          </div>
        </div>
        <div className='mt-12'>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {filteredRooms.map((room, index) => (
              <div
                key={index}
                className={`col-span-1 md:col-span-1 lg:col-span-1 gap-8`}
              >
                <RoomCard key={room._id} room={room} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Rooms;
