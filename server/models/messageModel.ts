import { Schema, Document, model } from 'mongoose';

interface IMessage extends Document {
  message: string;
}

const messageSchema = new Schema<IMessage>({
  message: {
    type: String,
  },
});

const MessageModel = model<IMessage>('Message', messageSchema, 'newcollection');

export default MessageModel;
