/** @format */

import { Dispatch, FC, SetStateAction, useState } from "react";
import { FaStar } from "react-icons/fa";

type Props = {
  ratingValue: number | null;
  setRatingValue: Dispatch<SetStateAction<number | null>>;
  ratingText: string;
  setRatingText: Dispatch<SetStateAction<string>>;
  reviewSubmitHandler: () => Promise<string | undefined | void>;
  isSubmittingReview: boolean;
};

const RoomRating: FC<Props> = (props) => {
  const {
    ratingValue,
    setRatingValue,
    ratingText,
    setRatingText,
    reviewSubmitHandler,
    isSubmittingReview,
  } = props;

  const [hoveredValue, setHoveredValue] = useState<number | null>(null); // State to track hovered value

  const starValues = [1, 2, 3, 4, 5];

  return (
    <div className='mb-8'>
      <div className='flex flex-col'>
        <p>Your Rating</p>
        <div className='flex py-2'>
          {starValues.map((value) => (
            <button
              className={`w-6 h-6 ${
                (hoveredValue !== null && hoveredValue >= value) ||
                ratingValue === value
                  ? "text-yellow-500"
                  : "text-gray-300"
              }`}
              onMouseEnter={() => setHoveredValue(value)} // Set hovered value when mouse enters
              onMouseLeave={() => setHoveredValue(null)} // Reset hovered value when mouse leaves
              onClick={() => setRatingValue(value)}
              key={value}
            >
              <FaStar />
            </button>
          ))}
        </div>

        <div className='flex flex-col mt-4'>
          <label className='mb-2'>Your Review</label>
          <textarea
            value={ratingText}
            onChange={(e) => setRatingText(e.target.value)}
            className='w-full px-2 py-3 border rounded-md focus:border-gray-300 duration-300 transition-all'
            rows={10}
          ></textarea>
          <button
            disabled={isSubmittingReview}
            onClick={reviewSubmitHandler}
            className='w-fit px-6 py-3 text-md font-medium text-white flex items-center bg-primary hover:bg-primary2 rounded-sm mt-4'
          >
            {isSubmittingReview ? "Submitting" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomRating;
