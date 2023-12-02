import { Request, Response } from 'express';
import MessageModel from '../models/messageModel';

async function dbread(req: Request, res: Response) {
  try {
    const messages = await MessageModel.find();
    res.status(200).json(messages);
  } catch (e) {
    console.error(e);
    res.status(500).send('Error occurred while fetching data');
  }
}

export { dbread };

// this function just gets all entries from "newtest" db, can be removed later, it's just here for test purposes if db is working
