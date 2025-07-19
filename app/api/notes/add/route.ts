import DatabaseConnection from "@/lib/mongoose";
import Note from "@/models/note";
import axios from "axios";
import FormData from "form-data";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    await DatabaseConnection();
    const formData: any = await req.formData();
    const title = formData.get("title");
    const desc = formData.get("desc");
    const userId = formData.get("userId");
    const username = formData.get("username");
    const profileURL = formData.get("profileURL");
    let file = formData.get("file");
    let imageURL =
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/41e9de19cfa4e099cf25410ac38542776693b54e_t.png";

    console.log(`[api/notes/add] [Recieved file:]`);
    console.log(file);

    if (file) {
      const filetype = file.type.split("/")[0];
      if (filetype === "image") {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadForm = new FormData();
        uploadForm.append("file", buffer, file.name);

        const response = await axios.post(
          "https://tmpfiles.org/api/v1/upload",
          uploadForm
        );

        let tempfilesURL = response.data.data.url;
        tempfilesURL = tempfilesURL.split(".org");
        tempfilesURL = tempfilesURL.join(".org/dl");

        const cdnResponse = await axios.post(
          "https://cdn.hackclub.com/api/v3/new",
          [tempfilesURL],
          {
            headers: {
              Authorization: "Bearer beans",
            },
          }
        );

        imageURL = cdnResponse.data.files[0].deployedUrl;
      }
    }

    console.log(`[api/notes/add] [CDN image link: ${imageURL}]`);

    const newNote = new Note({
      title,
      desc,
      userId,
      username,
      profileURL,
      likes: 0,
      likedBy: [],
      imageURL,
    });
    await newNote.save();
    return NextResponse.json(newNote, { status: 200 });
  } catch (err) {
    console.error(err);
  }
}
