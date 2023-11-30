import { Request, Response } from 'express';

interface SlackApiResponse {
  ok: boolean;
  messages: {
    text: string;
  }[];
}

const SLACK_CHANNEL = process.env.SLACK_CHANNEL;
const SLACK_TOKEN = process.env.SLACK_TOKEN;

async function getSlackMessages(req: Request, res: Response) {
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
      const data = (await response.json()) as SlackApiResponse;

      if (data.ok) {
        const texts = data.messages.map((message) => message.text);
        res.json(texts);
      } else {
        res.status(500).json({ error: 'Slack API responded with an error' });
      }
    } else {
      throw new Error('Failed to fetch Slack messages');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch Slack messages' });
  }
}

export { getSlackMessages };
