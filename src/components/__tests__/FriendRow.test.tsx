import { cleanup, render } from '@testing-library/react';
import React from 'react';
import userEvents from '@testing-library/user-event';
import { FriendRow, IFriendRowProps } from '../FriendRow';

describe('FriendRow', () => {
	const getProps = (): IFriendRowProps => {
		return {
			id: '1',
			name: 'Test Name',
			activeFriend: false,
			onClick: jest.fn()
		};
	};

	it('should match snapshot', () => {
		const props = getProps();
		const { container } = render(<FriendRow {...props} />);
		expect(container).toMatchSnapshot();
		cleanup();
	});

	it('should handle the button click', () => {
		const props = getProps();
		props.activeFriend = true;
		const { getAllByText } = render(<FriendRow {...props} />);
		const button = getAllByText('Test Name');
		expect(button).toHaveLength(1);
		userEvents.click(button[0]);
		expect(props.onClick).toHaveBeenCalledWith(props.id);
		expect(props.onClick).toHaveBeenCalledTimes(1);
		cleanup();
	});

	it('should display the active className', () => {
		const props = getProps();
		props.activeFriend = true;
		const { getAllByText } = render(<FriendRow {...props} />);
		const button = getAllByText('Test Name');
		expect(button).toHaveLength(1);
		expect(button[0].classList).toContain('friend-row--active');
		cleanup();
	});
});
