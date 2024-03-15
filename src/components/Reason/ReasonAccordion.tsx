/** @format */

"use client";

import { reasons } from "@/constants";
import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

const Accordion: React.FC = () => {
  const [reasonItem, setReasonItem] = useState(reasons);

  const handleAccordionToggle = (index: number) => {
    setReasonItem((prevItems) =>
      prevItems.map((item, i) => ({
        ...item,
        isActive: i === index ? !item.isActive : false,
      }))
    );
  };

  return (
    <div className=''>
      {reasonItem.map((item, index) => (
        <div key={index}>
          <div>
            <div
              className={`group relative flex w-full items-center font-semibold py-4 text-left text-xs text-black transition-all duration-300 ease-in-out ${
                item.isActive ? "open" : ""
              }`}
              onClick={() => handleAccordionToggle(index)}
            >
              <p className='text-xl'>{item.title}</p>
              <span className={`-mr-1 ml-auto h-5 w-5`}>
                {item.isActive ? (
                  <FaMinus className='transition-all duration-300 ease-in-out' />
                ) : (
                  <FaPlus className='transition-all duration-300 ease-in-out' />
                )}
              </span>
            </div>
          </div>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              item.isActive ? "max-h-96" : "max-h-0"
            } border-0`}
          >
            <div className='bg-white px-6 py-6 transition-all duration-300 ease-in-out'>
              <p className='px-4 py-6 text-gray-700 text-md bg-white transition-all duration-300 ease-in-out'>
                {item.desc}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
