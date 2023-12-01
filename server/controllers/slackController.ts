import { Request, Response } from 'express';
import 'dotenv/config'

interface ISlackApiResponse {
  ok: boolean;
  messages: {
    text: string;
  }[];
}

const SLACK_CHANNEL = process.env.SLACK_CHANNEL;
const SLACK_TOKEN = process.env.SLACK_TOKEN;

let cachedMessages: string[] = [];

const CACHE_TTL = 5 * 60 * 1000;

async function fetchSlackMessages() {
  try {
    const channelId = SLACK_CHANNEL;
    const token = SLACK_TOKEN;
    const limit = 2; // limits to the last 2 slack messages aka only show last 2 messages in dashboard later

    const response = await fetch(
      `https://slack.com/api/conversations.history?channel=${channelId}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      const data = (await response.json()) as ISlackApiResponse;

      if (data.ok) {
        const texts = data.messages.map((message) => message.text);
        cachedMessages = texts;
      } else {
        console.error('Slack API responded with an error');
      }
    } else {
      console.error('Failed to fetch Slack messages');
    }
  } catch (error) {
    console.error(error);
  }
}

// initial fetch when server starts
fetchSlackMessages();

// update every 5mins
setInterval(fetchSlackMessages, CACHE_TTL);

function getSlackMessages(req: Request, res: Response) {
  res.json(cachedMessages);
}

export { getSlackMessages };
