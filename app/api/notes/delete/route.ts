import DatabaseConnection from "@/lib/mongoose";
import Note from "@/models/note";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await DatabaseConnection();
    const { noteId } = await req.json();
    await Note.findByIdAndDelete(noteId);
    return NextResponse.json({ status: 200 });
  } catch (err) {
    console.error(err);
  }
}
