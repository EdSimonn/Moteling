/** @format */

import React from "react";
import { blogPost } from "@/constants";
import BlogCard from "../Cards/BlogCard/BlogCard";
import { pacifico } from "@/utils/fonts";

const Blog = () => {
  return (
    <div className='mx-auto w-full max-w-screen-xl ss:p-10 p-4 py-6 lg:py-8 bg-[rgb(249,247,244)]  '>
      <h1
        className={`${pacifico} flex items-center justify-center mb-12 font-bold text-5xl text-center pt-6 text-secondary`}
      >
        Latest News
      </h1>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
        {blogPost.map((posts) => (
          <BlogCard key={posts.title} {...posts} />
        ))}
      </div>
    </div>
  );
};

export default Blog;
