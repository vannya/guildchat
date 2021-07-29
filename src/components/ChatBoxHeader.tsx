import React from 'react';
interface IChatBoxHeaderProps {
	userName: string;
}

export const ChatBoxHeader = ({
	userName
}: IChatBoxHeaderProps): JSX.Element => {
	return <div className='chatbox-header'>Chatting with {userName}</div>;
};
