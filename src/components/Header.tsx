import React from 'react';
import { RouteComponentProps } from 'react-router';
export interface IHeaderProps extends RouteComponentProps {
	isAuth: boolean;
	onLogout: () => void;
}

export const Header = ({ isAuth, onLogout }: IHeaderProps): JSX.Element => {
	return (
		<div className='header'>
			<h1>Guild Chat</h1>
			{isAuth ? (
				<button onClick={onLogout}>Log out</button>
			) : (
				<div className='loggedout' />
			)}
		</div>
	);
};
