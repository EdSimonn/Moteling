/** @format */

import { useRouter } from "next/navigation";
import React, { ChangeEvent, FC } from "react";

type Props = {
  roomTypeFilter: string;
  setRoomTypeFilter: (value: string) => void;
};

const Filter: FC<Props> = ({ roomTypeFilter, setRoomTypeFilter }) => {
  const router = useRouter();

  const handleRoomTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newRoomTypeFilter = event.target.value;
    setRoomTypeFilter(newRoomTypeFilter);
    router.push(`/rooms?roomType=${newRoomTypeFilter}`);
  };

  return (
    <form className='max-w-sm'>
      <select
        value={roomTypeFilter}
        onChange={handleRoomTypeChange}
        className='bg-gray-50 border border-primary text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary2 block w-full p-2.5'
      >
        <option value='All'>All</option>
        <option value='Standard Room'>Standard Room</option>
        <option value='Luxury Room'>Luxury Room</option>
        <option value='Executive Suite'>Executive Suite</option>
        <option value='Presidential Suite'>Presidential Suite</option>
      </select>
    </form>
  );
};

export default Filter;
