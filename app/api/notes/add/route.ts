import DatabaseConnection from "@/lib/mongoose";
import Note from "@/models/note";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await DatabaseConnection();
    const { title, desc, userId, username, profileURL } = await req.json();
    const newNote = new Note({
      title,
      desc,
      userId,
      username,
      profileURL,
      likes: 0,
      likedBy: [],
    });
    await newNote.save();
    console.log(newNote);
    return NextResponse.json(newNote, { status: 200 });
  } catch (err) {
    console.error(err);
  }
}
