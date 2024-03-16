/** @format */
"use client";

import { Review } from "@/models/review";
import axios from "axios";
import React, { FC } from "react";
import { FaUserCircle } from "react-icons/fa";
import useSWR from "swr";
import Rating from "../Rating/Rating";
import Image from "next/image";

const RoomReview: FC<{ roomId: string }> = ({ roomId }) => {
  const fetchRoomReviews = async () => {
    const { data } = await axios.get<Review[]>(`/api/room-reviews/${roomId}`);
    return data;
  };

  const {
    data: roomReviews,
    error,
    isLoading,
  } = useSWR("/api/room-reviews", fetchRoomReviews);

  if (error) throw new Error("Cannot fetch data");
  if (typeof roomReviews === "undefined" && !isLoading)
    throw new Error("Cannot fetch data");

  // console.log(roomReviews);
  return (
    <>
      {roomReviews && roomReviews.length > 0 ? (
        roomReviews.map((review) => (
          <div
            key={review._id}
            className='space-y-2 font-medium divide-y divide-gray-600 px-4 mb-6'
          >
            <div className='flex gap-2'>
              <Image
                priority={true}
                src={review.user.image}
                alt={review.user.image}
                width={150}
                height={150}
                className='rounded-full w-20 h-20'
              />

              <div className='flex flex-col'>
                <div className='flex py-1 text-yellow-400'>
                  <Rating rating={review.userRating} />
                </div>
                <div className='flex items-center'>
                  <h3 className='font-semibold text-lg'>{review.user.name}</h3>-
                  <p className='text-gray-500'>
                    {review._createdAt.split("T")[0]}{" "}
                  </p>
                </div>

                <p className='pt-3 text-gray-500'>{review.text}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className='pl-8'>
          {roomReviews ? "No reviews available." : "Loading..."}
        </p>
      )}
    </>
  );
};

export default RoomReview;
