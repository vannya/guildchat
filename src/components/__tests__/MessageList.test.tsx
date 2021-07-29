import { cleanup, render } from '@testing-library/react';
import React from 'react';
import { AuthContext } from '../../services/context';
import { MessageList, IMessageListProps } from '../MessageList';

// Mock scrollIntoView
const scrollIntoViewMock = jest.fn();
window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

describe('MessageList', () => {
	const getProps = (): IMessageListProps => {
		return {
			messages: [
				{
					senderId: '1',
					timeStamp: new Date('07/28/2021'),
					content: 'Message 1'
				},
				{
					senderId: '2',
					timeStamp: new Date('07/29/2021'),
					content: 'Message 2'
				}
			]
		};
	};

	it('should match snapshot', () => {
		const props = getProps();
		const { container } = render(
			<AuthContext.Provider value={{ isAuth: true, userId: '1' }}>
				<MessageList {...props} />
			</AuthContext.Provider>
		);
		expect(container).toMatchSnapshot();
		cleanup();
	});

	it('should display the messages correctly', () => {
		const props = getProps();
		const { getAllByText } = render(
			<AuthContext.Provider value={{ isAuth: true, userId: '1' }}>
				<MessageList {...props} />
			</AuthContext.Provider>
		);
		const message1 = getAllByText(props.messages[0].content);
		expect(message1).toHaveLength(1);
		expect(message1[0].classList).toContain('message-row--outgoing');
		const message2 = getAllByText(props.messages[1].content);
		expect(message2).toHaveLength(1);
		expect(message2[0].classList).toContain('message-row--incoming');
		cleanup();
	});
});
