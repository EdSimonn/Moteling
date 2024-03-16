/** @format */
"use client";

import { getUserBookings } from "@/libs/apis";
import axios from "axios";
import { User } from "@/models/user";
import React, { useState } from "react";
import useSWR from "swr";
import LoadingSpinner from "../../loading";
import ReservationCard from "@/components/Cards/ReservationCard/ReservationCard";
import { pacifico } from "@/utils/fonts";

const ReservationsPage = (props: { params: { id: string } }) => {
  const {
    params: { id: userId },
  } = props;
  const [roomId, setRoomId] = useState<string | null>(null);

  const fetchUserBooking = async () => getUserBookings(userId);
  const fetchUserData = async () => {
    const { data } = await axios.get<User>("/api/users");
    return data;
  };

  const {
    data: userBookings,
    error,
    isLoading,
  } = useSWR("/api/userbooking", fetchUserBooking);

  const {
    data: userData,
    isLoading: loadingUserData,
    error: errorGettingUserData,
  } = useSWR("/api/users", fetchUserData);

  if (error || errorGettingUserData) throw new Error("Cannot fetch data");
  if (typeof userBookings === "undefined" && !isLoading)
    throw new Error("Cannot fetch data");
  if (typeof userData === "undefined" && !loadingUserData)
    throw new Error("Cannot fetch data");

  if (loadingUserData) return <LoadingSpinner />;
  if (!userData) throw new Error("Cannot fetch data");
  if (!userData) throw new Error("Cannot fetch data");

  // console.log(userBookings);

  return (
    <div className='mx-auto w-full max-w-screen-xl ss:p-10 p-4 py-6 lg:py-8 bg-[rgb(249,247,244)]'>
      <h1 className={`${pacifico} text-3xl font-extrabold`}>My Reservations</h1>

      <hr className='my-6 border-gray-200 sm:mx-auto dark:border-gray-200 lg:my-5' />

      {userBookings && userBookings.length > 0 ? (
        userBookings.map((bookings) => (
          <div
            key={bookings._id}
            className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8'
          >
            <ReservationCard
              bookingDetails={userBookings}
              setRoomId={setRoomId}
            />
          </div>
        ))
      ) : isLoading ? (
        <p className='text-center'>Loading...</p>
      ) : (
        <p className='text-center py-52'>No rooms reserved yet.</p>
      )}
    </div>
  );
};

export default ReservationsPage;
