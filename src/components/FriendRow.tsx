import React from 'react';

export interface IFriendRowProps {
	id: string;
	name: string;
	activeFriend: boolean;
	onClick: (id: string) => void;
}

export const FriendRow = ({
	id,
	name,
	activeFriend,
	onClick
}: IFriendRowProps): JSX.Element => {
	const handleOnClick = (): void => {
		onClick(id);
	};
	return (
		<button
			className={activeFriend ? 'friend-row--active' : 'friend-row'}
			onClick={handleOnClick}
		>
			{name}
		</button>
	);
};
