import React, { useRef, useEffect } from 'react';
import { USER_ID } from 'src';
import { MessageRow } from './MessageRow';
import { MessageItem } from '../types';

interface IMessageListProps {
	messages: MessageItem[];
}

export const MessageList = ({ messages }: IMessageListProps): JSX.Element => {
	const messagesEndRef = useRef(null);
	const scrollToBottom = (): void => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	};
	useEffect(() => {
		scrollToBottom();
	}, [messages.length]);

	return (
		<div className='message-list'>
			{messages.map(item => {
				return (
					<MessageRow
						key={item.timeStamp.toString()}
						text={item.content}
						displayType={item.senderId === USER_ID ? 'outgoing' : 'incoming'}
					/>
				);
			})}
			<div ref={messagesEndRef} />
		</div>
	);
};
