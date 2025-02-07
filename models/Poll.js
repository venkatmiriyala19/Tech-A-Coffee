import mongoose from "mongoose";
const PollSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  options: [
    {
      text: String,
      votes: {
        type: Number,
        default: 0,
      },
    },
  ],
  votedUsers: [
    {
      type: String, // Store user IDs of users who have voted
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Poll || mongoose.model("Poll", PollSchema);
