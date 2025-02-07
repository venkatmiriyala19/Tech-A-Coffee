"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs"; // Import the hook
import CreatePoll from "@/components/CreatePoll";
import QuickPoll from "@/components/QuickPoll";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

export default function QuickPolls() {
  const { user } = useUser(); // Get user information from Clerk
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [pollsUpdated, setPollsUpdated] = useState(false); // State to track new poll creation

  useEffect(() => {
    async function fetchPolls() {
      setLoading(true); // Start loading when fetching polls
      try {
        const response = await fetch("/api/polls", { method: "GET" });
        if (!response.ok) {
          throw new Error("Failed to fetch polls");
        }
        const data = await response.json();
        setPolls(data);
      } catch (error) {
        console.error("Error fetching polls:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    }

    fetchPolls();
  }, [pollsUpdated]); // Re-fetch when pollsUpdated changes

  // Callback function to trigger re-fetch when a new poll is created
  const handleNewPollCreated = () => {
    setPollsUpdated((prev) => !prev); // Toggle the state to trigger the re-fetch
  };

  return (
    <div className="ml-5">
      <div className="mx-6 mb-[4rem] flex justify-between items-center">
        <div>
          <h1 className="font-headerBold text-[1.7rem] mb-5">Create a Poll</h1>
          <CreatePoll onNewPollCreated={handleNewPollCreated} />{" "}
          {/* Pass callback */}
        </div>
        <img
          src="/assets/images/Microphone_3D.png"
          alt="LoudSpeaker"
          className="mr-10 h-full"
        />
      </div>

      <div className="border-t-2 border-[#eef3f9] pt-5 border-dashed mx-6 my-8">
        <h1 className="font-headerBold text-[1.7rem] mb-5">Quick Polls</h1>

        {loading ? (
          <section className="section-loading">
            <div className="dots-container">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </section>
        ) : polls.length > 0 ? (
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
          >
            <Masonry gutter="20px">
              {polls.map((poll) => (
                <QuickPoll key={poll._id} poll={poll} userId={user?.id} />
              ))}
            </Masonry>
          </ResponsiveMasonry>
        ) : (
          <p className="text-gray-500">No polls available.</p>
        )}
      </div>
    </div>
  );
}
