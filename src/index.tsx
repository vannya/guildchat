import React, { SyntheticEvent, useEffect, useState, ChangeEvent } from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/database';
import './styles.scss';
import { MessageItem } from './types';
import { ChatBox } from './components/ChatBox';
import { FriendsList } from './components/FriendList';

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
export const USER_ID = '2'; // Will handle auth later
export const RECEIVER_ID = '1'; // Will handle this later

const chatDB = firebase.database().ref('chats');

const userDB = firebase.database().ref('users');

export const App = (): JSX.Element => {
	const [messages, setMessages] = useState<MessageItem[]>([]);
	const [receiver, setReceiver] = useState(RECEIVER_ID);
	const [receiverName, setReceiverName] = useState(null);
	const [friendList, setFriendList] = useState([]);

	useEffect(() => {
		chatDB
			.child(
				Number(USER_ID) < Number(receiver)
					? `${USER_ID}:${receiver}`
					: `${receiver}:${USER_ID}`
			)
			.on('value', snapshot => {
				let messages: MessageItem[] = [];
				snapshot.forEach(item => {
					messages = item.val();
				});
				setMessages(messages);
			});
	}, [receiver]);

	useEffect(() => {
		async function getFriends(user: any): Promise<void> {
			let friends: any[] = [];
			await Promise.all(
				user.val().map(async (friend: any) => {
					const friendInfo = await userDB.child(friend).get();
					friends = [...friends, { name: friendInfo.val()?.name, id: friend }];
				})
			);
			setFriendList(friends);
		}

		userDB.child(USER_ID).on('value', snapshot => {
			snapshot.forEach(user => {
				if (user.key === 'friends') {
					getFriends(user);
				}
			});
		});
	}, []);

	useEffect(() => {
		if (receiver) {
			userDB.child(receiver).on('value', snapshot => {
				snapshot.forEach(user => {
					if (user.key === 'name' && user.val() !== receiverName) {
						setReceiverName(user.val());
					}
				});
			});
		}
	}, [receiver]);

	const addMessage = (text: string): void => {
		const updatedMessages = [
			...messages,
			{
				senderId: USER_ID,
				timeStamp: Date.now(),
				content: text
			}
		];
		chatDB
			.child(
				Number(USER_ID) < Number(receiver)
					? `${USER_ID}:${receiver}`
					: `${receiver}:${USER_ID}`
			)
			.update({
				messages: updatedMessages
			});
	};

	const updateReceiver = (id: string): void => {
		setReceiver(id);
	};

	return (
		<div className='guild-chat'>
			<FriendsList friends={friendList} onClick={updateReceiver} />
			<ChatBox
				receiverName={receiverName}
				messages={messages}
				onSubmit={addMessage}
			/>
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));
