import PollOption from "./PollOption";
import { useState } from "react";

export default function QuickPoll({ poll }) {
  const { question, options } = poll;

  return (
    <div className="bg-[#EEF3F9] w-full rounded-3xl p-3 px-5 border-2 border-black mb-4 h-auto">
      <h3 className="text-[#1D3F58] font-bold text-sm">Question</h3>
      <div className="flex items-center justify-between">
        <h1 className="text-[#001B2E] font-bold w-11/12 text-lg ml-2 mt-3">
          {question}
        </h1>
        <img
          src={"/assets/images/bookmark.png"}
          alt="Bookmark"
          className="w-7 mr-5"
        />
      </div>

      <hr
        className="mt-10 mb-5 border-t-2 mx-2 w-11/12"
        style={{ borderColor: "rgba(83, 118, 146, 0.5)" }}
      />

      {/* Map through poll options */}
      {options.map((option, index) => (
        <div className="my-3" key={index}>
          <PollOption option={option} />
        </div>
      ))}
    </div>
  );
}
