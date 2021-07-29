import { cleanup, render } from '@testing-library/react';
import React from 'react';
import { MessageRow, IMessageRowProps } from '../MessageRow';

describe('MessageRow', () => {
	const getProps = (): IMessageRowProps => {
		return {
			text: 'Message',
			displayType: 'outgoing'
		};
	};

	it('should match snapshot', () => {
		const props = getProps();
		const { container } = render(<MessageRow {...props} />);
		expect(container).toMatchSnapshot();
		cleanup();
	});

	it('should display incoming message properly', () => {
		const props = getProps();
		props.displayType = 'incoming';
		const { getByText } = render(<MessageRow {...props} />);
		const messageRow = getByText(props.text);
		expect(messageRow.classList).toContain('message-row--incoming');
		cleanup();
	});

	it('should display outgoing message properly', () => {
		const props = getProps();
		const { getByText } = render(<MessageRow {...props} />);
		const messageRow = getByText(props.text);
		expect(messageRow.classList).toContain('message-row--outgoing');
		cleanup();
	});
});
