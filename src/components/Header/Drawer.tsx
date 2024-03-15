/** @format */

import Link from "next/link";
import React, { useEffect, useState } from "react";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode; // This allows us to accept any valid React children in the Drawer component.
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, children }) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 100); // Adjust the timing based on your transition duration in CSS.
  };
  return (
    <div
      className={`fixed inset-0 overflow-hidden z-50 transition-opacity ${
        isOpen
          ? "ease-out opacity-100 pointer-events-auto"
          : "ease-in opacity-0 pointer-events-none"
      }`}
    >
      <div className='absolute inset-0 overflow-hidden'>
        <div
          className={`absolute inset-0 transition-opacity ${
            isOpen ? "bg-gray-500 opacity-75" : "bg-transparent opacity-0"
          }`}
          onClick={handleClose}
        />

        <section className='absolute inset-y-0 left-0 max-w-full flex outline-none'>
          <div className='w-screen max-w-[18rem] md:max-w-[20rem]'>
            <div className='h-full flex flex-col bg-[#131120] shadow-xl p-2 px-4'>
              <p
                onClick={handleClose}
                className='text-white bg-transparent hover:bg-gray-700 hover:text-white rounded-lg text-xl cursor-pointer px-3 py-1 absolute top-2.5 end-2.5 inline-flex items-center justify-center'
              >
                x
              </p>
              <div className='py-12 overflow-y-auto'>
                <ul className='space-y-2 font-medium divide-y divide-gray-600 px-4'>
                  <li>
                    <Link
                      className='flex items-center p-2 text-white font-normal hover:text-primary'
                      href='/'
                      onClick={handleClose}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      className='flex items-center p-2 text-white font-normal hover:text-primary'
                      href={""}
                      onClick={handleClose}
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      className='flex items-center p-2 text-white font-normal  hover:text-primary'
                      href='/rooms'
                      onClick={handleClose}
                    >
                      Room
                    </Link>
                  </li>
                  <li>
                    <Link
                      className='flex items-center p-2 text-white font-normal  hover:text-primary'
                      href={""}
                      onClick={handleClose}
                    >
                      Blog
                    </Link>
                  </li>
                  <li className='divide-y-0'>
                    <Link
                      className='flex items-center p-2 text-white font-normal  hover:text-primary'
                      href={""}
                      onClick={handleClose}
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Drawer;
