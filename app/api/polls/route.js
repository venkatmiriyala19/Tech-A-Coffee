import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Poll from "@/models/Poll";
import { getAuth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    const user = await currentUser();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { firstName, lastName, emailAddress } = user;
    console.log("User:", firstName);

    await connectDB();
    const { question, options } = await request.json();

    if (
      !question ||
      !options ||
      !Array.isArray(options) ||
      options.length < 2
    ) {
      return NextResponse.json({ error: "Invalid poll data" }, { status: 400 });
    }

    const pollOptions = options.map((option) => ({
      text: option.text,
      votes: 0,
    }));

    const userName = `${firstName} ${lastName}`.trim(); // Construct full name

    const poll = await Poll.create({
      userId,
      userName,
      question,
      options: pollOptions,
      createdAt: new Date(),
    });

    return NextResponse.json(poll);
  } catch (error) {
    console.error("Poll creation error:", error);
    return NextResponse.json(
      { error: "Failed to create poll" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    await connectDB();
    const polls = await Poll.find().sort({ createdAt: -1 });
    return NextResponse.json(polls);
  } catch (error) {
    console.error("Poll retrieval error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve polls" },
      { status: 500 }
    );
  }
}
