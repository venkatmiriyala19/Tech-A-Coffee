import mongoose from "mongoose";

const PollSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  userName: String,
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// ✅ Correct model export
export default mongoose.models.Poll || mongoose.model("Poll", PollSchema);
