import { WebClient } from "@slack/web-api";

export async function LikeMessage(like: boolean, messageTimestamp: string) {
  const client = new WebClient(process.env.SLACK_USER_TOKEN);
  try {
    if (like) {
      await client.reactions.add({
        name: "heart",
        channel: process.env.SLACK_CHANNEL_ID as string,
        timestamp: messageTimestamp,
      });
    } else {
      await client.reactions.remove({
        name: "heart",
        channel: process.env.SLACK_CHANNEL_ID as string,
        timestamp: messageTimestamp,
      });
    }
  } catch (err) {
    console.error(err);
  }
}
