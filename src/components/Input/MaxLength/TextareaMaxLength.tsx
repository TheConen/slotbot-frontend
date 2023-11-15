import {VerticalTextarea} from '../VerticalTextarea';
import {MaxLengthHelper} from './MaxLengthHelper';
import {TextareaProps} from '@mantine/core';
import {JSX} from 'react';

export function TextareaMaxLength(props: Readonly<TextareaProps>): JSX.Element {
	const {maxLength, value} = props;

	if (typeof value !== 'string') {
		throw Error('Wrong component used.');
	}
	return <VerticalTextarea {...MaxLengthHelper(maxLength, value, props)}/>;
}
