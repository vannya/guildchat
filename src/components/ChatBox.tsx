import React, { useState, SyntheticEvent, ChangeEvent } from 'react';
import { MessageForm } from './MessageForm';
import { MessageList } from './MessageList';
import { ChatBoxHeader } from './ChatBoxHeader';
import { MessageItem } from '../types';

interface IChatBoxProps {
	receiverName: string;
	messages: MessageItem[];
	onSubmit: (text: string) => void;
}

export const ChatBox = ({
	receiverName,
	messages,
	onSubmit
}: IChatBoxProps): JSX.Element => {
	const [text, setText] = useState<string>('');

	const onClickHandler = (e: SyntheticEvent): void => {
		e.preventDefault();
		const trimmedText = text.trim();
		if (trimmedText !== '') {
			onSubmit(trimmedText);
		}
		setText('');
	};

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
		setText(e.target.value);
	};
	return (
		<div>
			<ChatBoxHeader userName={receiverName} />
			<div className='chat-box'>
				{messages && <MessageList messages={messages} />}
				<MessageForm
					id='chat-message'
					value={text}
					disabled={!text.trim()}
					onChange={onChangeHandler}
					onClick={onClickHandler}
				/>
			</div>
		</div>
	);
};
