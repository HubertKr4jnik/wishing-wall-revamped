import { NextResponse } from "next/server";
import { WebClient } from "@slack/web-api";
import DatabaseConnection from "@/lib/mongoose";
import Note from "@/models/note";

export async function POST(req: any) {
  const client = new WebClient(process.env.SLACK_BOT_TOKEN);
  await DatabaseConnection();
  try {
    let { title, desc, userId, noteId, imageURL, productLink } =
      await req.json();

    title = title
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/@/g, "\\@");

    console.log(
      `[/api/slack/postMessage] [Recieved title: ${title} description: ${desc}, userID: ${userId}, productLink: ${productLink} and imageURL: ${imageURL}]`
    );
    let message = [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: `:sparkles: New wish, take a look y'all! :sparkles:`,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `<@${userId}> just wished for ${
            productLink === undefined
              ? `\`${title}\``
              : `\`<${productLink}|${title}>\``
          }`,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `_${desc} _`,
        },
      },
    ];

    if (
      imageURL !==
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/41e9de19cfa4e099cf25410ac38542776693b54e_t.png"
    ) {
      message.push({
        type: "image",
        image_url: imageURL,
        alt_text: "Image",
      });
    }

    const response = await client.chat.postMessage({
      channel: process.env.SLACK_CHANNEL_ID as string,
      text: `New wish for ${title}`,
      blocks: message,
    });

    await Note.findByIdAndUpdate(noteId, {
      messageTimestamp: response.message.ts,
    });

    return NextResponse.json({ status: 200 });
  } catch (err) {
    console.error(err);
  }
}
