/** @format */

import Image from "next/image";
import { L1 } from "../../../public/assets";

const LoadingSpinner = () => (
  <div className='flex items-center justify-center h-screen'>
    <Image priority={true} src={L1} alt='loader' className='w-32 h-32' />
  </div>
);

export default LoadingSpinner;
