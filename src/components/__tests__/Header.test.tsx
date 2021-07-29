import { cleanup, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Header, IHeaderProps } from '../Header';

describe('Header', () => {
	const getProps = (): IHeaderProps => {
		return {
			isAuth: true,
			onLogout: jest.fn()
		};
	};

	it('should match snapshot', () => {
		const props = getProps();
		const { container } = render(<Header {...props} />);
		expect(container).toMatchSnapshot();
		cleanup();
	});

	it('should not show a Logout button if logged out', () => {
		const props = getProps();
		props.isAuth = false;
		const { container } = render(<Header {...props} />);
		const buttonPlaceholder = container.querySelectorAll('.loggedout');
		expect(buttonPlaceholder).toHaveLength(1);
		cleanup();
	});

	it('should show a Logout button if logged in', () => {
		const props = getProps();
		const { container, getAllByText } = render(<Header {...props} />);
		const button = getAllByText('Log out');
		expect(button).toHaveLength(1);
		const buttonPlaceholder = container.querySelectorAll('.loggedout');
		expect(buttonPlaceholder).toHaveLength(0);
		cleanup();
	});

	it('should log out a user', () => {
		const props = getProps();
		const { getAllByText } = render(<Header {...props} />);
		const button = getAllByText('Log out');
		expect(button).toHaveLength(1);
		userEvent.click(button[0]);
		expect(props.onLogout).toHaveBeenCalledTimes(1);
		cleanup();
	});
});
