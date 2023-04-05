export interface Message {
  id: number;
  senderId: number;
  senderUserName: string;
  senderPhotoUrl: string;
  recipientId: number;
  recipientUserName: string;
  recipienPhotoUrl: string;
  content: string;
  dateRead?: Date;
  messageSent: Date;
}