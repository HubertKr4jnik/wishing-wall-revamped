import { NextRequest, NextResponse } from "next/server";
import DatabaseConnection from "@/lib/mongoose";
import Note from "@/models/note";

export async function POST(req: NextRequest) {
  await DatabaseConnection();
  const body = await req.json();
  //   console.log(body);

  if (body.type === "url_verification") {
    return NextResponse.json(body.challenge);
  }

  if (body.event.type === "reaction_added" && body.event.reaction === "heart") {
    const note = await Note.findOne({ messageTimestamp: body.event.item.ts });
    if (!note.likedBy.includes(body.event.user)) {
      await Note.findOneAndUpdate(
        { messageTimestamp: body.event.item.ts },
        {
          $inc: { likes: 1 },
          $push: { likedBy: body.event.user },
        },
        { new: true }
      );
    }
  }

  if (
    body.event.type === "reaction_removed" &&
    body.event.reaction === "heart"
  ) {
    const note = await Note.findOne({ messageTimestamp: body.event.item.ts });
    if (note.likedBy.includes(body.event.user)) {
      await Note.findOneAndUpdate(
        { messageTimestamp: body.event.item.ts },
        { $inc: { likes: -1 }, $pull: { likedBy: body.event.user } },
        { new: true }
      );
    }
  }

  return NextResponse.json({ status: 200 });
}
