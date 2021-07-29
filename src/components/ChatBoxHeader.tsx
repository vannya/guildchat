import React from 'react';
interface IChatBoxHeaderProps {
	userName: string;
}

export const ChatBoxHeader = ({
	userName
}: IChatBoxHeaderProps): JSX.Element => {
	return <h2 className='chatbox-header'>Chatting with {userName}</h2>;
};
