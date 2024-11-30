"use client";
import React, { useState, useEffect } from "react";
import NewsHome from "@/components/NewsHome";
import { useNews } from "@/context/NewsContext";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function Feed() {
  const [techFact, setTechFact] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch Tech Fact Function
  const fetchTechFact = async () => {
    setLoading(true); // Start loading
    try {
      const genAI = new GoogleGenerativeAI(
        process.env.NEXT_PUBLIC_GEMINI_API_KEY
      );
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = "Generate a new Tech Fact";

      const result = await model.generateContent(prompt);
      setTechFact(result.response.text());
    } catch (error) {
      console.error("Error fetching tech fact:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchTechFact(); // Fetch a fact when the component mounts
  }, []);

  // Access news from NewsProvider context
  const { news, loading: newsLoading } = useNews();

  return (
    <div className="flex">
      {/* Left Section */}
      <div className="ml-10 pr-5">
        <h1 className="font-headerBold text-[1.7rem] mb-3">
          Random Tech Facts
        </h1>
        <div className="border-2 border-[#eef3f9] w-[60vw] rounded-2xl h-[30vh] p-5 relative">
          {loading ? (
            <div className="dots-container">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          ) : (
            <p className="font-bold text-xl">{techFact}</p>
          )}

          <button
            className="absolute bg-[#eef3f9] bottom-5 right-5 text-black font-bold px-4 py-2 text-lg rounded-md 
             transition-all duration-500 ease-in-out 
             box-border 
             shadow-md hover:shadow-lg hover:border-black hover:scale-105 active:scale-95 active:rotate-2"
            onClick={fetchTechFact}
            disabled={loading}
          >
            Generate New
          </button>
        </div>
      </div>

      {/* Right Section */}

      <div className="border-l-4 border-dashed border-[#eef3f9] ml-10 pl-10 ">
        <h1 className="font-headerBold text-[1.7rem] mb-3">Latest in Tech</h1>
        <div>
          {newsLoading ? (
            <p>Loading News...</p>
          ) : (
            news
              .slice(0, 4)
              .map((item) => (
                <NewsHome
                  key={item.id}
                  title={item.webTitle}
                  date={new Date(item.webPublicationDate).toLocaleString()}
                  img={item.fields.thumbnail}
                  url={item.webUrl}
                  width="25vw"
                />
              ))
          )}
        </div>
      </div>
    </div>
  );
}
