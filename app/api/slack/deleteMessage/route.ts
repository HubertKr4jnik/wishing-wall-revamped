import { WebClient } from "@slack/web-api";

export async function DeleteMessage(messageTimestamp: string) {
  const client = new WebClient(process.env.SLACK_BOT_TOKEN);
  try {
    const response = await client.chat.delete({
      channel: process.env.SLACK_CHANNEL_ID as string,
      ts: messageTimestamp,
    });
  } catch (err) {
    console.error(err);
  }
}
