import React from 'react';

interface IFriendRowProps {
	id: string;
	name: string;
	onClick: (id: string) => void;
}

export const FriendRow = ({
	id,
	name,
	onClick
}: IFriendRowProps): JSX.Element => {
	const handleOnClick = (): void => {
		onClick(id);
	};
	return <button onClick={handleOnClick}>{name}</button>;
};
