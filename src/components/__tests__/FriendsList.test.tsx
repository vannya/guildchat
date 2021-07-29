import { cleanup, render } from '@testing-library/react';
import React from 'react';
import { FriendsList, IFriendsListProps } from '../FriendsList';

describe('FriendsList', () => {
	const getProps = (): IFriendsListProps => {
		return {
			currentChat: '1',
			friends: [],
			isInitialLoadingCompleted: true,
			onClick: jest.fn()
		};
	};

	it('should match snapshot', () => {
		const props = getProps();
		const { container } = render(<FriendsList {...props} />);
		expect(container).toMatchSnapshot();
		cleanup();
	});

	it('should not load if loading not completed', () => {
		const props = getProps();
		props.isInitialLoadingCompleted = false;
		const { container } = render(<FriendsList {...props} />);
		expect(container).toMatchSnapshot();
		cleanup();
	});

	it('should display friend rows if there are friends', () => {
		const props = getProps();
		props.friends = [
			{ id: '2', name: 'Friend 2' },
			{ id: '3', name: 'Friend 3' }
		];
		const { container } = render(<FriendsList {...props} />);
		const friendRows = container.querySelectorAll('.friend-row');
		expect(friendRows).toHaveLength(2);
		cleanup();
	});
});
