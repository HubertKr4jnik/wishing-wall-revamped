import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: { type: String },
    desc: { type: String },
    userId: { type: String },
    username: { type: String },
    profileURL: { type: String },
    likes: { type: Number },
    likedBy: { type: Array },
    imageURL: { type: String },
    messageTimestamp: { type: String },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.models.Note || mongoose.model("Note", noteSchema);
export default Note;
