import DatabaseConnection from "@/lib/mongoose";
import Note from "@/models/note";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await DatabaseConnection();
    const notes = await Note.find({});
    return NextResponse.json(notes, { status: 200 });
  } catch (err) {
    console.error(err);
  }
}
