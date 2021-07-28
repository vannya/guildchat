import React, { ChangeEvent, SyntheticEvent } from 'react';
interface IMessageFormProps {
	id: string;
	buttonText?: string;
	labelText?: string;
	value: string;
	disabled?: boolean;
	onClick: (e: SyntheticEvent) => void;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
export const MessageForm = ({
	id,
	buttonText = 'Send',
	labelText = 'Enter Text',
	value,
	disabled = false,
	onClick,
	onChange
}: IMessageFormProps): JSX.Element => {
	return (
		<form>
			<label htmlFor={id}>{labelText}</label>
			<input
				id={id}
				type='text'
				onChange={onChange}
				value={value}
				maxLength={500}
			/>
			<button disabled={disabled} onClick={onClick}>
				{buttonText}
			</button>
		</form>
	);
};
