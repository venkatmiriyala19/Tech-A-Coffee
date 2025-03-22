"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGuardianData = async () => {
    const apiKey = process.env.NEXT_PUBLIC_GUARDIAN_API_KEY;
    const url = `https://content.guardianapis.com/search?section=technology&api-key=${apiKey}&show-fields=thumbnail`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setNews(data.response.results); // Store results in state
    } catch (error) {
      console.error("Error fetching Guardian API data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuardianData();
  }, []);

  return (
    <NewsContext.Provider value={{ news, loading }}>
      {children}
    </NewsContext.Provider>
  );
};

// Custom hook to use NewsContext
export const useNews = () => useContext(NewsContext);
