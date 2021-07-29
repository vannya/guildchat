import { cleanup, render } from '@testing-library/react';
import React from 'react';
import { ChatBoxHeader, IChatBoxHeaderProps } from '../ChatBoxHeader';

describe('ChatBoxHeader', () => {
	const getProps = (): IChatBoxHeaderProps => {
		return {
			userName: 'Test Name'
		};
	};

	it('should match snapshot', () => {
		const props = getProps();
		const { container } = render(<ChatBoxHeader {...props} />);
		expect(container).toMatchSnapshot();
		cleanup();
	});
});
