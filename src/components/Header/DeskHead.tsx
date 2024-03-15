/** @format */
"use client";

import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaUserCircle,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { signIn, signOut, useSession } from "next-auth/react";

import Image from "next/image";
import { useState } from "react";
import { h1 } from "../../../public/assets";
import toast from "react-hot-toast";

const DeskHead = () => {
  const [activeLink, setActiveLink] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLinkClick = (index: any) => {
    setActiveLink(index);
  };

  const { data: session } = useSession();

  const userId = session?.user?.id;

  const loginHandler = async () => {
    try {
      await signIn();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <header className='text-white'>
      <nav className='hidden sm:block'>
        <div className='mx-auto w-full max-w-screen-xl ss:px-10 px-4 py-2 bg-black text-white'>
          <div className='flex justify-between items-center text-xs'>
            <p className='text-gray-300'>
              Have Any Question?
              <span className='text-[#F89500] font-semibold'>
                +909080804044
              </span>
            </p>
            <p className='text-gray-300'>45 Grand Terminal New York</p>
            <div className='flex justify-between items-center gap-6 text-[#F89500]'>
              <i>
                <FaFacebookF />
              </i>
              <i>
                <FaXTwitter />
              </i>
              <i>
                <FaInstagram />
              </i>
              <i>
                <FaPinterestP />
              </i>
            </div>
          </div>
        </div>

        <div className='mx-auto w-full max-w-screen-xl ss:p-10 p-4 py-4 lg:py-6 text-white bg-[#131120]'>
          <div className='flex justify-between items-center'>
            <Link href='/' className='cursor-pointer'>
              <Image
                priority={true}
                src={h1}
                alt='h1'
                className=' h-22 w-60 '
              />
            </Link>

            <ul className='flex justify-between items-center gap-6 text-xl'>
              <li
                className={`cursor-pointer ${
                  activeLink === 0 ? "text-primary" : "text-white"
                }`}
                onClick={() => handleLinkClick(0)}
              >
                <Link href='/'>Home</Link>
              </li>
              <li
                className={`cursor-pointer ${
                  activeLink === 1 ? "text-primary" : "text-white"
                }`}
                onClick={() => handleLinkClick(1)}
              >
                <Link href='/'>About</Link>
              </li>
              <li
                className={`cursor-pointer ${
                  activeLink === 2 ? "text-primary" : "text-white"
                }`}
                onClick={() => handleLinkClick(2)}
              >
                <Link href='/rooms'>Room</Link>
              </li>
              <li
                className={`cursor-pointer ${
                  activeLink === 3 ? "text-primary" : "text-white"
                }`}
                onClick={() => handleLinkClick(3)}
              >
                <Link href='/'>Blog</Link>
              </li>
              <li
                className={`cursor-pointer ${
                  activeLink === 4 ? "text-primary" : "text-white"
                }`}
                onClick={() => handleLinkClick(4)}
              >
                <Link href='/'>Contact</Link>
              </li>
            </ul>

            <div className='flex items-center'>
              {session?.user ? (
                <div className='relative'>
                  <button onClick={handleDropdownToggle} className='relative'>
                    <Link href={``}>
                      {session.user.image ? (
                        <div className='w-10 h-10 rounded-full overflow-hidden'>
                          <Image
                            priority={true}
                            src={session.user.image}
                            alt={session.user.name!}
                            width={40}
                            height={40}
                            className='scale-animation img'
                          />
                        </div>
                      ) : (
                        <FaUserCircle className='cursor-pointer text-2xl' />
                      )}
                    </Link>
                  </button>
                  {isDropdownOpen && (
                    <div className=''>
                      <div className='absolute bg-white p-2 rounded shadow-md z-10 right-2 w-fit'>
                        <ul className='space-y-2 divide-y-2'>
                          <li className='text-md text-secondary  hover:text-primary cursor-pointer'>
                            <Link href={`/users/${userId}`}>Reservations</Link>
                          </li>
                          <li
                            className='text-md text-secondary hover:text-primary cursor-pointer'
                            onClick={() => signOut()}
                          >
                            Logout
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={loginHandler}
                  type='button'
                  className='px-6 py-3 rounded text-sm font-medium text-white flex items-center bg-primary hover:bg-primary2'
                >
                  <Link href=''>Sign In</Link>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default DeskHead;
