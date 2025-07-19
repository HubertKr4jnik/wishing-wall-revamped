import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  try {
    let { title, desc, userId, imageURL, productLink } = await req.json();

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

    const response = await axios.post(process.env.SLACK_WEBHOOK_URL as string, {
      blocks: message,
    });

    return NextResponse.json({ status: 200 });
  } catch (err) {
    console.error(err);
  }
}
