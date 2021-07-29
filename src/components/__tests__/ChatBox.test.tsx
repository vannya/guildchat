import React from 'react';
import { cleanup, render } from '@testing-library/react';
import userEvents from '@testing-library/user-event';
import { ChatBox, IChatBoxProps } from '../ChatBox';

// Mock scrollIntoView for MessageList child
const scrollIntoViewMock = jest.fn();
window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

describe('ChatBox', () => {
	const getProps = (): IChatBoxProps => {
		return {
			receiverName: 'Test Name',
			messages: [],
			onSubmit: jest.fn()
		};
	};

	it('should match snapshot', () => {
		const props = getProps();
		const { container } = render(<ChatBox {...props} />);
		expect(container).toMatchSnapshot();
		cleanup();
	});

	it('should update the text', () => {
		const props = getProps();
		const { container } = render(<ChatBox {...props} />);
		// Change text
		const inputField = container.querySelectorAll('#chat-message');
		expect(inputField).toHaveLength(1);
		expect(inputField[0].getAttribute('value')).toBe('');
		// Update text
		userEvents.type(inputField[0], 'Message to send');
		expect(inputField[0].getAttribute('value')).toBe('Message to send');
		cleanup();
	});

	it('should submit text', () => {
		const props = getProps();
		const { container, getAllByText } = render(<ChatBox {...props} />);
		// Change text
		const inputField = container.querySelectorAll('#chat-message');
		expect(inputField).toHaveLength(1);
		userEvents.type(inputField[0], 'Message to send');
		// Submit
		const submitButton = getAllByText('Send');
		expect(submitButton).toHaveLength(1);
		userEvents.click(submitButton[0]);

		expect(props.onSubmit).toHaveBeenCalledTimes(1);
		expect(props.onSubmit).toHaveBeenCalledWith('Message to send');
		cleanup();
	});

	it('should submit trimmed text', () => {
		const props = getProps();
		const { container, getAllByText } = render(<ChatBox {...props} />);
		// Change text
		const inputField = container.querySelectorAll('#chat-message');
		expect(inputField).toHaveLength(1);
		userEvents.type(inputField[0], '    Message to send   ');
		// Submit
		const submitButton = getAllByText('Send');
		expect(submitButton).toHaveLength(1);
		expect(submitButton[0].getAttribute('disabled')).toBe(null);
		userEvents.click(submitButton[0]);

		expect(props.onSubmit).toHaveBeenCalledTimes(1);
		expect(props.onSubmit).toHaveBeenCalledWith('Message to send');
		cleanup();
	});

	it('should not submit empty text', () => {
		const props = getProps();
		const { container, getAllByText } = render(<ChatBox {...props} />);
		// Change text
		const inputField = container.querySelectorAll('#chat-message');
		expect(inputField).toHaveLength(1);
		userEvents.type(inputField[0], '            ');
		// Submit
		const submitButton = getAllByText('Send');
		expect(submitButton).toHaveLength(1);
		userEvents.click(submitButton[0]);

		expect(props.onSubmit).not.toHaveBeenCalledTimes(1);
		cleanup();
	});

	it('should disable the submit button when there is no text', () => {
		const props = getProps();
		const { getAllByText } = render(<ChatBox {...props} />);
		// Submit without adding input value
		const submitButton = getAllByText('Send');
		expect(submitButton).toHaveLength(1);
		userEvents.click(submitButton[0]);
		expect(submitButton[0].getAttribute('disabled')).toBe('');

		expect(props.onSubmit).not.toHaveBeenCalled();
		cleanup();
	});
});
