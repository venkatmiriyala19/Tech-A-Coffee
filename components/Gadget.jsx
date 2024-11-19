"use client";
import { FaStar } from "react-icons/fa";
import { useState } from "react";

export default function Gadget({ title, price, rating, image, count }) {
  const [isInverted, setIsInverted] = useState(false);

  const handleClick = () => {
    setIsInverted(true);
    setTimeout(() => setIsInverted(false), 300);
  };
  return (
    <div className="w-[15vw] ">
      <div className="w-[15vw] h-[15vw] flex items-center justify-center rounded-xl bg-white p-5">
        <img
          src={image}
          alt="Gadget"
          className="w-full h-full object-contain"
        />
      </div>
      <div className="flex items-center justify-between px-1 pt-2 pb-1">
        <h1 className="font-bold line-clamp-2">{title}</h1>
        <img
          src="/assets/images/bookmark_white.png"
          alt="Bookmark"
          className="w-5 h-5 cursor-pointer"
        />
      </div>
      <h2 className="flex items-center pl-1">
        <FaStar color="#FFC633" style={{ marginRight: "0.5rem" }} />
        {rating} <span className="opacity-50"> ({count})</span>
      </h2>
      <div className="pl-1 flex items-center justify-between pt-1">
        <h1 className="font-bold text-lg ">${price}</h1>
        <button
          className={`px-3 py-1 text-sm font-bold rounded transition-colors duration-300 ${
            isInverted ? "bg-[#1D3F58] text-white" : "bg-white text-[#1D3F58]"
          }`}
          onClick={handleClick}
        >
          Visit Store
        </button>
      </div>
    </div>
  );
}
