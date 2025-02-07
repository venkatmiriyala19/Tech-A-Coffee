import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Poll from "@/models/Poll";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(request) {
  try {
    const { userId } = getAuth(request);

    // Ensure the user is authenticated
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    // Parse the request body
    const { pollId, optionId } = await request.json();

    // Validate the request data
    if (!pollId || !optionId) {
      return NextResponse.json(
        { error: "Poll ID and Option ID are required" },
        { status: 400 }
      );
    }

    // Find the poll by ID
    const poll = await Poll.findById(pollId);

    if (!poll) {
      return NextResponse.json({ error: "Poll not found" }, { status: 404 });
    }

    // Check if the user has already voted
    if (poll.votedUsers && poll.votedUsers.includes(userId)) {
      return NextResponse.json(
        { error: "You have already voted in this poll" },
        { status: 400 }
      );
    }

    // Find the option and increment its vote count
    const option = poll.options.id(optionId);

    if (!option) {
      return NextResponse.json(
        { error: "Option not found in the poll" },
        { status: 404 }
      );
    }

    option.votes += 1;

    // Add the user to the votedUsers array to prevent duplicate votes
    if (!poll.votedUsers) {
      poll.votedUsers = [];
    }
    poll.votedUsers.push(userId);

    // Save the updated poll
    await poll.save();

    return NextResponse.json({ message: "Vote submitted successfully", poll });
  } catch (error) {
    console.error("Vote submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit vote" },
      { status: 500 }
    );
  }
}
