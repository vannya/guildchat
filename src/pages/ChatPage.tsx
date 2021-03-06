import React, { useContext, useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/database';
import { MessageItem } from '../types';
import { ChatBox } from '../components/ChatBox';
import { FriendsList } from '../components/FriendsList';
import { AuthContext } from '../services/context';
import { Redirect } from 'react-router-dom';

export const ChatPage = (): JSX.Element => {
	const [messages, setMessages] = useState<MessageItem[]>([]);
	const [receiver, setReceiver] = useState(null);
	const [receiverName, setReceiverName] = useState(null);
	const [friendList, setFriendList] = useState([]);
	const [isInitialLoadingCompleted, setIsInitialLoadingCompleted] =
		useState(false);
	const [isFriendsListOpenInMobile, setIsFriendsListOpenInMobile] =
		useState<boolean>(false);

	const chatDB = firebase.database().ref('chats');
	const userDB = firebase.database().ref('users');

	const context = useContext(AuthContext);

	useEffect(() => {
		chatDB
			.child(
				Number(context.userId) < Number(receiver)
					? `${context.userId}:${receiver}`
					: `${receiver}:${context.userId}`
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
			try {
				await Promise.all(
					user.val().map(async (friend: any) => {
						const friendInfo = await userDB.child(friend).get();
						friends = [...friends, { name: friendInfo.val()?.name, id: friend }];
					})
				);
			} catch (err) {
				console.log(err);
			}
			setFriendList(friends);
			setReceiver(friends[0].id);
		}

		userDB.child(context.userId).on('value', snapshot => {
			snapshot.forEach(user => {
				if (user.key === 'friends') {
					getFriends(user).then(() => {
						setIsInitialLoadingCompleted(true);
					});
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
				senderId: context.userId,
				timeStamp: Date.now(),
				content: text
			}
		];
		chatDB
			.child(
				Number(context.userId) < Number(receiver)
					? `${context.userId}:${receiver}`
					: `${receiver}:${context.userId}`
			)
			.update({
				messages: updatedMessages
			});
	};

	const updateReceiver = (id: string): void => {
		setReceiver(id);
		setIsFriendsListOpenInMobile(false);
	};

	const closeMobileFriendList = (): void => {
		setIsFriendsListOpenInMobile(false);
	};

	const openMobileFriendList = (): void => {
		setIsFriendsListOpenInMobile(true);
	};

	// Quick way to add demo friends for a new demo user
	const addDemoFriends = (): void => {
		const demoFriends = [];
		for (let i = 1; i < 4; i++) {
			if (i !== Number(context.userId)) {
				demoFriends.push(i.toString());
			}
		}
		userDB.child(context.userId).update({ friends: demoFriends });
	};

	if (!context.isAuth) {
		return <Redirect push to='/' />;
	}
	if (!isInitialLoadingCompleted) {
		return <></>;
	}
	return (
		<div className='chat-page'>
			{friendList.length > 0 ? (
				<>
					<button className='mobile-friend-list' onClick={openMobileFriendList}>
						Open Friends List
					</button>
					<FriendsList
						currentChat={receiver}
						friends={friendList}
						onClick={updateReceiver}
						isInitialLoadingCompleted={isInitialLoadingCompleted}
						isFriendListOpenInMobile={isFriendsListOpenInMobile}
						onClose={closeMobileFriendList}
					/>
					<ChatBox
						receiverName={receiverName}
						messages={messages}
						onSubmit={addMessage}
					/>
				</>
			) : (
				<div>
					<div>Add Friends to begin chatting!</div>
					<button onClick={addDemoFriends}>Add Demo Friends</button>
				</div>
			)}
		</div>
	);
};
