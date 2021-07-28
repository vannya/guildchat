export type MessageItem = {
	senderId: string;
	timeStamp: Date;
	content: string;
};

export type Chats = {
	chatId: string;
	messages: MessageItem[];
};
