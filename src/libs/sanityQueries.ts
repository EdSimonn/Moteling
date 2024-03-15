/** @format */

import { groq } from "next-sanity";

export const getFeaturedRoomQuery = groq`*[_type == "hotelRoom" && isFeatured == true][] {
    _id,
    description,
    discount,
    images,
    isFeatured,
    name,
    price,
    slug,
    coverImage,
    type
}`;

export const getRoomsQuery = groq`*[_type == "hotelRoom"] {
    _id, 
    coverImage,
    description,
    dimension,
    isBooked,
    isFeatured,
    name,
    price,
    slug,
    type
}`;

export const getRoom = groq`*[_type == "hotelRoom" && slug.current == $slug][0] {
    _id,
    coverImage,
    description,
    dimension,
    discount,
    images,
    isBooked,
    isFeatured,
    name,
    numberOfBeds,
    offeredAmenities,
    price,
    slug,
    specialNote,
    type
}`;

export const getUserBookingsQuery = groq`*[_type == 'booking' && user._ref == $userId] {
    _id,
    hotelRoom -> {
        _id,
        name,
        slug,
        price,
        coverImage,
    },
    checkinDate,
    checkoutDate,
    numberOfDays,
    adults,
    children,
    totalPrice,
    discount,
    _createdAt,
}`;

export const getUserDataQuery = groq`*[_type == 'user' && _id == $userId][0] {
    _id,
    name,
    email,
    isAdmin,
    about,
    _createdAt,
    image,
}`;

export const getRoomReviewsQuery = groq`*[_type == "review" && hotelRoom._ref == $roomId] {
    _createdAt,
    _id,
    text,
    user -> {
        name,
        image,
    },
    userRating
}`;