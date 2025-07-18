import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  try {
    const { title, desc, userId, imageURL } = await req.json();
    console.log(
      `[/api/slack/postMessage] [Recieved title: ${title} description: ${desc}, userID: ${userId} and imageURL: ${imageURL}]`
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
          text: `<@${userId}> just wished for \`<https://hc-cdn.hel1.your-objectstorage.com/s/v3/74fa205892d759a0275d77d2197919a34d73597a_image.png | ${title}>\``,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: ` \_${desc}\_`,
        },
      },
    ];

    if (
      imageURL !==
      "https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg"
    ) {
      message.push({
        type: "image",
        image_url: imageURL,
        alt_text: "Image",
      });
    }

    const response = await axios.post(process.env.SLACK_WEBHOOK_URL as string, {
      blocks: message,
    });

    return NextResponse.json({ status: 200 });
  } catch (err) {
    console.error(err);
  }
}
