import React, { useRef, useEffect } from 'react';
import { USER_ID } from 'src';
import { MessageItem } from './MessageItem';

interface IMessageListProps {
	messages: any[];
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
					<MessageItem
						key={item.timeStamp}
						text={item.content}
						displayType={item.senderId === USER_ID ? 'outgoing' : 'incoming'}
					/>
				);
			})}
			<div ref={messagesEndRef} />
		</div>
	);
};
