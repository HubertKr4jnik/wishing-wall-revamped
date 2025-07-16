import DatabaseConnection from "@/lib/mongoose";
import Note from "@/models/note";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await DatabaseConnection();
    const { noteId, userId } = await req.json();
    const foundNote = await Note.findById(noteId);
    const likedBy = foundNote.likedBy;

    if (likedBy.includes(userId)) {
      console.log("nope");
      return NextResponse.json(foundNote, { status: 200 });
    } else {
      console.log(noteId);
      const updatedNote = await Note.findByIdAndUpdate(
        noteId,
        { $inc: { likes: 1 }, $push: { likedBy: userId } },
        { new: true }
      );
      return NextResponse.json(updatedNote, { status: 200 });
    }
  } catch (err) {
    console.error(err);
  }
}
