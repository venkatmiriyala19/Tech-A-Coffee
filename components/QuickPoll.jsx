import { useState } from "react";
import PollOption from "./PollOption";

export default function QuickPoll({ poll }) {
  const { _id, question, options } = poll;
  const [updatedOptions, setUpdatedOptions] = useState(options);
  const [userVoted, setUserVoted] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState(null);

  const handleVote = (optionId) => {
    // Update the options state to reflect the vote
    const updatedOpts = updatedOptions.map((opt) =>
      opt._id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
    );
    setUpdatedOptions(updatedOpts);
    setSelectedOptionId(optionId); // Save the selected option's ID
    setUserVoted(true); // Set flag to true after user has voted
  };

  const totalVotes = updatedOptions.reduce(
    (acc, option) => acc + option.votes,
    0
  );

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
      {updatedOptions.map((option) => {
        const percentage =
          totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;

        return (
          <div className="my-3" key={option._id}>
            <PollOption
              option={option}
              pollId={_id}
              onVote={handleVote}
              isSelected={selectedOptionId === option._id} // Pass selected state
              percentage={percentage.toFixed(2)} // Pass percentage as a prop
            />
          </div>
        );
      })}
    </div>
  );
}
