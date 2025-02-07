import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Poll from "@/models/Poll";

export async function GET(request) {
  try {
    // Connect to the database
    await connectDB();

    // Fetch all polls from the database
    const polls = await Poll.find().sort({ createdAt: -1 }); // Sort by creation date

    // Return the polls in the response
    return NextResponse.json(polls);
  } catch (error) {
    console.error("Poll retrieval error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve polls" },
      { status: 500 }
    );
  }
}
