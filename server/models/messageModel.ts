import mongoose, { Document } from 'mongoose';

interface IMessage extends Document {
  message: string;
}

const messageSchema = new mongoose.Schema<IMessage>({
  message: {
    type: String,
  },
});

const MessageModel = mongoose.model<IMessage>(
  'Message',
  messageSchema,
  'newcollection'
);

export default MessageModel;
