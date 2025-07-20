import DatabaseConnection from "@/lib/mongoose";
import Note from "@/models/note";
import { DeleteMessage } from "../../slack/deleteMessage/route";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await DatabaseConnection();
    const { noteId } = await req.json();
    const deletedNote = await Note.findByIdAndDelete(noteId);
    if (deletedNote) {
      await DeleteMessage(deletedNote.messageTimestamp);
    }
    return NextResponse.json({ status: 200 });
  } catch (err) {
    console.error(err);
  }
}
