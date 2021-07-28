import React, { SyntheticEvent, useEffect, useState, ChangeEvent } from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/database';
import './styles.scss';
import { MessageForm } from './components/MessageForm';
import { MessageList } from './components/MessageList';
import { MessageItem } from './types';

// FIREBASE INITIALIZATION
firebase.initializeApp({
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.FIREBASE_URL,
	projectId: process.env.FIREBASE_PROJECT_ID,
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
	appId: process.env.FIREBASE_APP_ID,
	measurementId: process.env.FIREBASE_MEASUREMENT_ID
});
firebase.analytics();

// CONSTANTS
export const USER_ID = 1; // Will handle auth later
export const RECEIVER_ID = 2; // Will handle this later

const chatDB = firebase
	.database()
	.ref('chats')
	.child(
		USER_ID < RECEIVER_ID
			? `${USER_ID}:${RECEIVER_ID}`
			: `${RECEIVER_ID}:${USER_ID}`
	);

export const App = (): JSX.Element => {
	const [messages, setMessages] = useState<MessageItem[]>([]);
	const [text, setText] = useState<string>('');

	useEffect(() => {
		chatDB.on('value', snapshot => {
			let messages: MessageItem[] = [];
			snapshot.forEach(item => {
				messages = item.val();
			});
			setMessages(messages);
		});
	}, []);

	const onClickHandler = (e: SyntheticEvent): void => {
		e.preventDefault();
		const trimmedText = text.trim();
		if (trimmedText !== '') {
			const updatedMessages = [
				...messages,
				{
					senderId: USER_ID,
					timeStamp: Date.now(),
					content: trimmedText
				}
			];
			chatDB.update({
				messages: updatedMessages
			});
		}
		setText('');
	};

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
		setText(e.target.value);
	};

	return (
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
	);
};

ReactDOM.render(<App />, document.getElementById('root'));
