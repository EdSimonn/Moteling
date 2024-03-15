/** @format */

import React from "react";
import Image from "next/image";
import { merriweather } from "@/utils/fonts";

const BlogCard = ({ img, title, desc, comment, date, tags }: any) => {
  return (
    <div className='max-w-lg bg-white'>
      <Image
        className='rounded w-[100%]'
        priority={true}
        src={img}
        alt=''
        width={400}
        height={400}
      />
      <div className='p-5'>
        <p className='bg-[#F89500] text-white text-xs rounded w-fit px-2 py-1 mb-4 font-medium'>
          {tags}
        </p>
        <h5
          className={`${merriweather} mb-2 text-xl font-bold tracking-tight text-black`}
        >
          {title}
        </h5>
        <p className='mb-3 text-md text-gray-700'>{desc}</p>

        <hr className='my-3 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4' />

        <div className='flex gap-3 text-xs dark:text-gray-500 pb-8'>
          <p>COMMENTS:{comment}</p>
          <p className=''>{date}</p>
        </div>

        <a
          href='#'
          className='inline-flex px-6 py-3 text-sm font-medium text-white items-center bg-[#F89500] hover:bg-[#D17E00] rounded-sm'
        >
          Read more
        </a>
      </div>
    </div>
  );
};

export default BlogCard;
