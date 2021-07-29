import React from 'react';
import { FriendRow } from './FriendRow';

interface IFriendsListProps {
	friends: any[];
	onClick: (id: string) => void;
}

export const FriendsList = ({
	friends,
	onClick
}: IFriendsListProps): JSX.Element => {
	if (friends.length) {
		return (
			<div className='friends-list'>
				<h2>Friends List</h2>
				<div className='friends-list--buttons'>
					{friends.map(friend => {
						return (
							<FriendRow
								key={friend.id}
								id={friend.id}
								name={friend.name}
								onClick={onClick}
							/>
						);
					})}
				</div>
			</div>
		);
	} else {
		return <button>Add Friends</button>;
	}
};
