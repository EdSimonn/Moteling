/** @format */

import About from "@/components/About/About";
import Blog from "@/components/Blog/Blog";
import ExtraService from "@/components/ExtraService/ExtraService";
import FeaturedRoom from "@/components/FeaturedRoom/FeaturedRoom";
import HeroSection from "@/components/HeroSection/HeroSection";
import Reason from "@/components/Reason/Reason";
import Testimonial from "@/components/Testimonial/Testimonial";

import { getFeaturedRoom } from "@/libs/apis";

const Home = async () => {
  const featuredRoom = await getFeaturedRoom();

  return (
    <div>
      <HeroSection />
      <About />
      <FeaturedRoom featuredRoom={featuredRoom} />
      <Reason />
      <div className='w-full h-{100%} bg-banner2 bg-center bg-cover bg-gray-500 bg-blend-multiply'>
        <ExtraService />
      </div>
      <div className='w-full h-{100%} bg-banner2 bg-center bg-cover bg-gray-900 bg-blend-multiply'>
        <Testimonial />
      </div>
      <Blog />
    </div>
  );
};

export default Home;
