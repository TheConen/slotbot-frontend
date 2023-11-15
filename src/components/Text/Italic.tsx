import {Text} from '@mantine/core';
import {JSX, ReactNode} from 'react';

type ItalicProps = {
	children: ReactNode;
};

export function Italic(props: Readonly<ItalicProps>): JSX.Element {
	return (
		<Text italic span>{props.children}</Text>
	);
}
