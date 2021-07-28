import React, { SyntheticEvent, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/database';
import './styles.scss';

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
const USER_ID = 2; // Will handle auth later
const RECEIVER_ID = 1; // Will handle this later
const chatDB = firebase
	.database()
	.ref('chats')
	.child(
		USER_ID < RECEIVER_ID
			? `${USER_ID}:${RECEIVER_ID}`
			: `${RECEIVER_ID}:${USER_ID}`
	);

export const App = (): JSX.Element => {
	const [messages, setMessages] = useState([]);
	const [text, setText] = useState('');

	useEffect(() => {
		chatDB.on('value', snapshot => {
			let messages: any[] = [];
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

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setText(e.target.value);
	};

	return (
		<>
			{messages &&
				messages.map(item => {
					return <div key={item.timeStamp}>{item.content}</div>;
				})}
			<form>
				<label htmlFor='chat-message'>Enter Text</label>
				<input
					id='chat-message'
					type='text'
					onChange={onChangeHandler}
					value={text}
					maxLength={500}
				/>
				<button disabled={!text.trim()} onClick={onClickHandler}>
					Send
				</button>
			</form>
		</>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));
