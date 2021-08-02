import React from 'react';
import { FriendRow } from './FriendRow';
import { Friend } from '../types';

export interface IFriendsListProps {
	currentChat: string;
	friends: Friend[];
	isInitialLoadingCompleted: boolean;
	isFriendListOpenInMobile: boolean;
	onClick: (id: string) => void;
	onClose: () => void;
}

export const FriendsList = ({
	currentChat,
	friends,
	isInitialLoadingCompleted,
	isFriendListOpenInMobile = false,
	onClick,
	onClose
}: IFriendsListProps): JSX.Element => {
	if (isFriendListOpenInMobile) {
		return (
			<div className='friends-list friends-list--mobile'>
				<button className='friends-list--close' onClick={onClose}>
					X
				</button>
				<h2>Friends List</h2>
				<div className='friends-list--buttons'>
					{!isInitialLoadingCompleted ? null : friends.length > 0 ? (
						friends.map(friend => {
							return (
								<FriendRow
									key={friend.id}
									id={friend.id}
									name={friend.name}
									onClick={onClick}
									activeFriend={currentChat === friend.id}
								/>
							);
						})
					) : (
						<div>Add Friends</div>
					)}
				</div>
			</div>
		);
	}
	return (
		<div className='friends-list'>
			<h2>Friends List</h2>
			<div className='friends-list--buttons'>
				{!isInitialLoadingCompleted ? null : friends.length > 0 ? (
					friends.map(friend => {
						return (
							<FriendRow
								key={friend.id}
								id={friend.id}
								name={friend.name}
								onClick={onClick}
								activeFriend={currentChat === friend.id}
							/>
						);
					})
				) : (
					<div>Add Friends</div>
				)}
			</div>
		</div>
	);
};
