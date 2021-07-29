import React, { ChangeEvent, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from 'src';

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
						<div>
							<select onChange={handleOnChange}>
								<option value=''></option>
								<option value='1'>Bob</option>
								<option value='2'>Jane</option>
								<option value='3'>Noah</option>
							</select>
							<button onClick={handleOnClick}>Log In</button>
						</div>
					);
				}
			}}
		</AuthContext.Consumer>
	);
};
