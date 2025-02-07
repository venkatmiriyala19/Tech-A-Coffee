"use client";
import React, { useState } from "react";
import { FaRegCircle, FaCircle, FaPlus } from "react-icons/fa";
import { useAuth } from "@clerk/nextjs";

export default function CreatePoll() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([{ id: 1, text: "" }]);
  const [newOptionText, setNewOptionText] = useState("");
  const { userId } = useAuth();

  const handleAddOption = () => {
    if (newOptionText.trim()) {
      const newOption = {
        id: options.length + 1,
        text: newOptionText.trim(),
      };
      setOptions([...options, newOption]);
      setNewOptionText("");
    }
  };

  const handleOptionChange = (id, newText) => {
    const updatedOptions = options.map((option) =>
      option.id === id ? { ...option, text: newText } : option
    );
    setOptions(updatedOptions);
  };

  const handleRemoveOption = (id) => {
    const updatedOptions = options.filter((option) => option.id !== id);
    setOptions(updatedOptions);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/polls", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
          options: options.map(({ text }) => ({ text })),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create poll");
      }

      // Reset form or redirect
      setQuestion("");
      setOptions([{ id: 1, text: "" }]);
    } catch (error) {
      console.error("Error creating poll:", error);
    }
  };
  return (
    <div className="bg-[#EEF3F9] w-[50vw] rounded-3xl p-3 px-5 border-2 border-black">
      <h3 className="text-[#1D3F58] font-bold text-sm">Question</h3>
      <div className="flex items-center justify-between">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter your poll question"
          className="text-[#001B2E] bg-inherit font-bold w-11/12 text-lg ml-2 px-2 py-1 rounded resize-none overflow-hidden focus:outline-none mt-3"
          rows={1}
          style={{ minHeight: "40px", maxHeight: "160px" }}
          onInput={(e) => {
            e.target.style.height = "40px";
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
        />
      </div>
      <hr
        className="mt-10 mb-5 border-t-2 mx-2 w-11/12"
        style={{ borderColor: "rgba(83, 118, 146, 0.5)" }}
      />

      {/* Poll Options */}
      {options.map((option) => (
        <div
          key={option.id}
          className="mx-2 w-11/12 bg-[#B3CDE4] p-4 rounded flex items-center justify-between mb-3"
        >
          {/* Left Section: Circle and Option Input */}
          <div className="flex items-center w-full">
            <div className="relative mr-2">
              <FaRegCircle
                className="w-full h-full text-[#1D3F58]"
                style={{ fontSize: "1.5rem" }}
              />
            </div>
            <input
              type="text"
              value={option.text}
              onChange={(e) => handleOptionChange(option.id, e.target.value)}
              placeholder="Enter option text"
              className="text-[#001B2E] font-medium flex-grow px-2 py-1 rounded  bg-inherit focus:outline-none "
            />
            {options.length > 1 && (
              <button
                onClick={() => handleRemoveOption(option.id)}
                className="ml-2 text-red-600 hover:text-red-800"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      ))}

      {/* Add Option Section */}
      <div className="mx-2 w-11/12 flex items-center mt-3">
        <input
          type="text"
          value={newOptionText}
          onChange={(e) => setNewOptionText(e.target.value)}
          placeholder="Add a new option"
          className="flex-grow mr-2 p-4 rounded border text-[#1D3F58] font-medium border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1D3F58]"
        />
        <button
          onClick={handleAddOption}
          className="bg-[#1D3F58] text-white p-4 rounded hover:bg-opacity-90 flex items-center"
        >
          <FaPlus className="mr-1" /> Add Option
        </button>
      </div>
      {/* Submit Poll Button */}
      <div className="mt-5 flex justify-start">
        <button
          onClick={handleSubmit}
          className="bg-[#1D3F58] ml-2 text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-[#1D3F58]"
        >
          Submit Poll
        </button>
      </div>
    </div>
  );
}
