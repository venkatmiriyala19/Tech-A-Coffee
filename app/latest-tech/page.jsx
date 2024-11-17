// app/latestTech/page.jsx (or wherever you want to display the news)
"use client";

import React from "react";
import { useNews } from "@/context/NewsContext"; // Import the custom hook to access news context
import News from "@/components/News";

export default function LatestTech() {
  const { news, loading } = useNews(); // Access news and loading state from context

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1 className="font-headerBold text-[1.7rem] mb-5 ml-5">
        Latest in Tech
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ml-5 mr-5 gap-10">
        {news.map((item) => (
          <News
            key={item.id}
            title={item.webTitle}
            date={new Date(item.webPublicationDate).toLocaleString()}
            img={item.fields.thumbnail}
            url={item.webUrl}
            width="15vw"
          />
        ))}
      </div>
    </>
  );
}
