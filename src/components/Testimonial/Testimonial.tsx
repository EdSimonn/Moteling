/** @format */
"use client";

import { pacifico } from "@/utils/fonts";
import TestimonialCard from "../Cards/TestimonialCard/TestimonialCard";
import { testimonials } from "@/constants";

const Testimonial = () => {
  return (
    <div className='mx-auto w-full max-w-screen-xl ss:p-10 p-4 py-6 lg:py-8 text-white bg-[rgb(249,247,244)] '>
      <h1
        className={`${pacifico} text-secondary flex items-center justify-center mb-12 font-bold text-5xl text-center pt-6 `}
      >
        What Customer Say
      </h1>

      <div className='grid sm:grid-cols-2 gap-6 grid-cols-1 md:grid-cols-3'>
        {testimonials.map((testimonial, index) => (
          <div key={index}>
            <TestimonialCard key={testimonial.title} {...testimonial} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
