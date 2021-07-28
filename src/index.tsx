import React, { SyntheticEvent, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/database';
import './styles.scss';

// Initialize Firebase
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

const db = firebase.database().ref('chats');

const USER_ID = 1; // Will handle auth later
const RECEIVER_ID = 2; // Will handle this later

export const App = (): JSX.Element => {
	const [messages, setMessages] = useState([]);
	const [text, setText] = useState('');

	const onClick = (e: SyntheticEvent): void => {
		e.preventDefault();
		const trimmedText = text.trim();
		if (trimmedText !== '') {
			const updatedMessages = messages.slice();
			updatedMessages.push({
				senderId: USER_ID,
				timeStamp: Date.now(),
				content: trimmedText
			});
			db.set([
				{
					chatId:
						USER_ID < RECEIVER_ID
							? `${USER_ID}:${RECEIVER_ID}`
							: `${RECEIVER_ID}:${USER_ID}`,
					messages: updatedMessages
				}
			]);
			setText('');
		}
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setText(e.target.value);
	};

	useEffect(() => {
		db.on('value', snapshot => {
			let messages: any[] = [];
			snapshot.forEach(item => {
				if (
					USER_ID < RECEIVER_ID &&
					item.val().chatId === `${USER_ID}:${RECEIVER_ID}`
				) {
					messages = item.val().messages;
				} else if (item.val().chatId === `${RECEIVER_ID}:${USER_ID}`) {
					messages = item.val().messages;
				}
			});
			setMessages(messages);
		});
	}, []);

	return (
		<>
			{messages.map(item => {
				return <div key={item.timeStamp}>{item.content}</div>;
			})}
			<form>
				<label>Enter Text</label>
				<input type='text' onChange={onChange} value={text} />
				<button disabled={!text.trim()} onClick={onClick}>
					test
				</button>
			</form>
		</>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));
