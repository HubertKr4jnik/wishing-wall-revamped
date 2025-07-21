import DatabaseConnection from "@/lib/mongoose";
import Note from "@/models/note";
import { LikeMessage } from "../../slack/likeMessage/route";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await DatabaseConnection();
    const { noteId, userId } = await req.json();
    const foundNote = await Note.findById(noteId);
    const likedBy = foundNote.likedBy;

    if (likedBy.includes(userId)) {
      console.log(`[api/like] [Unliking note ${noteId}]`);
      const updatedNote = await Note.findByIdAndUpdate(
        noteId,
        { $inc: { likes: -1 }, $pull: { likedBy: userId } },
        { new: true }
      );
      try {
        // await LikeMessage(false, updatedNote.messageTimestamp);
      } catch (err) {
        console.error(err);
      }
      return NextResponse.json(updatedNote, { status: 200 });
    } else {
      console.log(`[api/like] [Liking note ${noteId}]`);
      const updatedNote = await Note.findByIdAndUpdate(
        noteId,
        { $inc: { likes: 1 }, $push: { likedBy: userId } },
        { new: true }
      );
      try {
        // await LikeMessage(true, updatedNote.messageTimestamp);
      } catch (err) {
        console.error(err);
      }
      return NextResponse.json(updatedNote, { status: 200 });
    }
  } catch (err) {
    console.error(err);
  }
}
