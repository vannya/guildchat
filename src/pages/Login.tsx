import React, { ChangeEvent, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../services/context';

interface ILoginProps {
	setAuth: (isAuth: boolean) => void;
	setUserId: (userId: string) => void;
}

export const Login = ({ setAuth, setUserId }: ILoginProps): JSX.Element => {
	const [user, setUser] = useState(null);

	const handleOnClick = (): void => {
		if (user) {
			setAuth(true);
			setUserId(user);
		}
	};

	const handleOnChange = (e: ChangeEvent<HTMLSelectElement>): void => {
		setUser(e.target.value);
	};

	return (
		<AuthContext.Consumer>
			{({ isAuth }): JSX.Element => {
				if (isAuth) {
					return <Redirect push to='chat' />;
				} else {
					return (
						<div className='login-page'>
							<h2>Welcome to Guild Chat</h2>
							<h3>Please log in to demo!</h3>
							<div className='login-page--select-group'>
								<select onChange={handleOnChange}>
									<option value=''>Choose a user</option>
									<option value='1'>Bob</option>
									<option value='2'>Jane</option>
									<option value='3'>Noah</option>
								</select>
								<button onClick={handleOnClick}>Log In</button>
							</div>
						</div>
					);
				}
			}}
		</AuthContext.Consumer>
	);
};
