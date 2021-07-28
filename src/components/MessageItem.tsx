import React from 'react';

interface IMessageItemProps {
	text: string;
	displayType: 'outgoing' | 'incoming';
}

export const MessageItem = ({
	text,
	displayType
}: IMessageItemProps): JSX.Element => {
	return <div className={`message-item--${displayType}`}>{text}</div>;
};
