/** @format */
"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";

import Image from "next/image";
import { BiMenuAltRight } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { h1 } from "../../../public/assets";
import Drawer from "./Drawer";
import toast from "react-hot-toast";

const MoboHead = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const { data: session } = useSession();

  const userId = session?.user?.id;

  const loginHandler = async () => {
    try {
      await signIn();
    } catch (error) {
      // console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <div className='sm:hidden'>
      <div className='mx-auto max-w-screen-xl p-4 text-white bg-[#131120]'>
        <div className='flex justify-between items-center'>
          <div className='flex justify-between items-center gap-4'>
            <div onClick={handleDrawerOpen}>
              <BiMenuAltRight className='h-8 w-8 hover:text-[#F89500]' />

              <Drawer isOpen={isDrawerOpen} onClose={handleDrawerClose}>
                <div>
                  <div className='py-4 overflow-y-auto'>
                    <ul className='space-y-2 font-medium'></ul>
                  </div>
                </div>
              </Drawer>
            </div>
            <Link href='/' className=''>
              <Image
                priority={true}
                src={h1}
                alt='h1'
                className=' h-22 w-36 '
              />
            </Link>
          </div>

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
                        <li className='text-md text-secondary cursor-pointer'>
                          <Link href={`/users/${userId}`}>Reservations</Link>
                        </li>
                        <li
                          className='text-md text-secondary cursor-pointer'
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
    </div>
  );
};

export default MoboHead;
