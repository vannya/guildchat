import { cleanup, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { MessageForm, IMessageFormProps } from '../MessageForm';

describe('MessageForm', () => {
	const getProps = (): IMessageFormProps => {
		return {
			id: 'message-chat',
			value: '',
			onClick: jest.fn(e => e.preventDefault()),
			onChange: jest.fn()
		};
	};

	it('should match snapshot', () => {
		const props = getProps();
		const { container } = render(<MessageForm {...props} />);
		expect(container).toMatchSnapshot();
		cleanup();
	});

	it('should calls onChange', () => {
		const props = getProps();
		const { container } = render(<MessageForm {...props} />);
		const inputField = container.querySelectorAll(`#${props.id}`);
		expect(inputField).toHaveLength(1);
		userEvent.type(inputField[0], 'Test Message');
		expect(props.onChange).toHaveBeenCalledTimes(12); // once per char
		cleanup();
	});

	it('should calls onClick', () => {
		const props = getProps();
		const { container } = render(<MessageForm {...props} />);
		const button = container.querySelectorAll(`.message-form--button`);
		expect(button).toHaveLength(1);
		userEvent.click(button[0]);
		expect(props.onClick).toHaveBeenCalledTimes(1);
		cleanup();
	});
});
