import { useState } from "react";
import { FaRegCircle, FaCircle } from "react-icons/fa";

export default function PollOption({
  option,
  pollId,
  onVote,
  isSelected,
  percentage,
}) {
  const [isVoting, setIsVoting] = useState(false);
  const [error, setError] = useState(null);

  const handleVote = async () => {
    setIsVoting(true);
    setError(null);

    try {
      const response = await fetch("/api/vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pollId,
          optionId: option._id,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit vote");
      }

      // Call parent component's onVote callback to update UI
      onVote(option._id);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <div
      className={`mx-2 w-11/12 p-4 rounded flex items-center justify-between cursor-pointer 
        ${isVoting ? "opacity-50" : ""} ${
        isSelected ? "bg-[#A3C4D7]" : "bg-[#B3CDE4]"
      }`}
      style={{ backgroundColor: isSelected ? "#A3C4D7" : "#B3CDE4" }}
      onClick={handleVote}
    >
      {/* Left Section: Circle and Option Label */}
      <div className="flex items-center">
        <div className="relative">
          {/* If the option is selected, show the filled circle */}
          {isSelected ? (
            <FaCircle
              className="w-full h-full text-[#1D3F58]"
              style={{ fontSize: "1.5rem" }}
            />
          ) : (
            <FaRegCircle
              className="w-full h-full text-[#1D3F58]"
              style={{ fontSize: "1.5rem" }}
            />
          )}
        </div>
        <span className="ml-2 text-[#001B2E] font-medium">{option.text}</span>
      </div>

      {/* Right Section: Percentage */}
      <span className="text-[#1D3F58] font-bold">{percentage}%</span>

      {/* Error Handling */}
      {error && (
        <div className="text-red-500 text-sm absolute bottom-0 left-0">
          {error}
        </div>
      )}
    </div>
  );
}
