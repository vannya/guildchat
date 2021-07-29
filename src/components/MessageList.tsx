import React, { useRef, useEffect, useContext } from 'react';
import { MessageRow } from './MessageRow';
import { MessageItem } from '../types';
import { AuthContext } from '../services/context';

export interface IMessageListProps {
	messages: MessageItem[];
}

export const MessageList = ({ messages }: IMessageListProps): JSX.Element => {
	const messagesEndRef = useRef(null);
	const scrollToBottom = (): void => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	};
	const context = useContext(AuthContext);
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
						displayType={item.senderId === context.userId ? 'outgoing' : 'incoming'}
					/>
				);
			})}
			<div ref={messagesEndRef} />
		</div>
	);
};
