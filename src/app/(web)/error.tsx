/** @format */

"use client";

import Image from "next/image";
import { e1 } from "../../../public/assets";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className='bg-white'>
      <div className='py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6'>
        <div className='mx-auto max-w-screen-sm text-center'>
          <h1 className='mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-gray-700'>
            500
          </h1>
          <p className='mb-4 text-3xl tracking-tight font-bold text-gray-600 md:text-4xl'>
            Internal Server Error.
          </p>
          <p className='mb-4 text-lg font-light text-gray-500'>
            We are already working to solve the problem.{" "}
          </p>
          <button
            onClick={() => reset()}
            className='px-6 py-3 rounded text-sm font-medium text-white bg-primary hover:bg-primary2'
          >
            Try Again
          </button>
        </div>
      </div>
    </section>
    // <div className='w-full h-full relative'>
    //   <Image priority={true} src={e1} alt={""} className=' h-full w-full' />
    //   <div className='absolute text-white flex items-center justify-center top-1/2 left-1/2 translate-x-[-50%] ss:translate-y-[50%] sm:translate-y-[500%] md:translate-y-[700%] lg:translate-y-[700%] translate-y-[225%]'>
    // <button
    //   onClick={() => reset()}
    //   className='px-6 py-3 rounded text-sm font-medium text-white flex items-center bg-primary hover:bg-primary2'
    // >
    //   Try Again
    // </button>
    //   </div>
    // </div>
  );
}

// #C4B191
// #b19b77;
// #9D9DA0
// #bababa;
