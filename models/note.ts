import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: { type: String },
  desc: { type: String },
  userId: { type: String },
  username: { type: String },
  profileURL: { type: String },
  likes: { type: Number },
  likedBy: { type: Array },
});

const Note = mongoose.models.Note || mongoose.model("Note", noteSchema);
export default Note;
