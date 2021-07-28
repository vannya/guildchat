import React from 'react';
interface IMessageHeaderProps {
	userName: string;
}

export const MessageHeader = ({
	userName
}: IMessageHeaderProps): JSX.Element => {
	return <div className='message-header'>Chatting with {userName}</div>;
};
