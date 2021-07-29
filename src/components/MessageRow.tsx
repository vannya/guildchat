import React from 'react';

export interface IMessageRowProps {
	text: string;
	displayType: 'outgoing' | 'incoming';
}

export const MessageRow = ({
	text,
	displayType
}: IMessageRowProps): JSX.Element => {
	return <div className={`message-row--${displayType}`}>{text}</div>;
};
