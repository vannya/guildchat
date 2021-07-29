import React, { ChangeEvent, SyntheticEvent } from 'react';
export interface IMessageFormProps {
	id: string;
	buttonText?: string;
	placeholderText?: string;
	value: string;
	disabled?: boolean;
	onClick: (e: SyntheticEvent) => void;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
export const MessageForm = ({
	id,
	buttonText = 'Send',
	placeholderText = 'Enter Text',
	value,
	disabled = false,
	onClick,
	onChange
}: IMessageFormProps): JSX.Element => {
	return (
		<form className='message-form'>
			<input
				id={id}
				type='text'
				onChange={onChange}
				value={value}
				maxLength={500}
				placeholder={placeholderText}
			/>
			<button
				className='message-form--button'
				disabled={disabled}
				onClick={onClick}
			>
				{buttonText}
			</button>
		</form>
	);
};
