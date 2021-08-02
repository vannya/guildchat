import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { MenuIcon } from '../assets/menu';
export interface IHeaderProps extends RouteComponentProps {
	isAuth: boolean;
	onLogout: () => void;
}

export const Header = withRouter(
	({ isAuth, onLogout, location }: IHeaderProps): JSX.Element => {
		return (
			<div className='header'>
				<h1>
					{location?.pathname !== '/' && (
						<button className='menu-icon'>
							<MenuIcon />
						</button>
					)}
					Guild Chat
				</h1>
				{isAuth ? (
					<button onClick={onLogout}>Log out</button>
				) : (
					<div className='loggedout' />
				)}
			</div>
		);
	}
);
