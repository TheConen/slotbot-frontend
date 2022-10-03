import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {createStyles, Group, GroupProps, Text, ThemeIcon, UnstyledButton} from '@mantine/core';
import {Link, LinkProps} from 'react-router-dom';

const useStyles = createStyles((theme) => ({
	actionIcon: { /*Copy pasta from mantine ActionIcon*/
		...theme.fn.hover({backgroundColor: theme.fn.variant({color: 'green', variant: 'filled'}).hover}),
		'&:active': theme.activeStyles,

		'&[data-disabled=true]': {
			color: theme.colors.gray[theme.colorScheme === 'dark' ? 6 : 4],
			backgroundColor: theme.fn.themeColor('gray', theme.colorScheme === 'dark' ? 8 : 1),
			borderColor: theme.fn.themeColor('gray', theme.colorScheme === 'dark' ? 8 : 1),

			'&:active': {
				transform: 'none',
			},
		},
	},
}));

type AddButtonProps = {
	label: string;
	disabled?: boolean;
	mt?: GroupProps['mt'];
	mb?: GroupProps['mb'];
} & (
	| {
	onClick: () => void;
	to?: never;
}
	| {
	onClick?: never;
	to: LinkProps['to'];
}
	);

export function AddButton(props: AddButtonProps): JSX.Element {
	const {label, disabled, mt, mb, onClick, to} = props;

	const {classes} = useStyles();

	return (
		<UnstyledButton onClick={onClick} disabled={disabled}
						{/*@ts-ignore TS doesn't understand this component*/...{}}
						component={to ? Link : UnstyledButton} to={to}>
			<Group spacing={6} mt={mt} mb={mb}>
				<ThemeIcon color={'green'} variant={'filled'} radius={'xl'} className={classes.actionIcon}
						   data-disabled={disabled}>
					<FontAwesomeIcon icon={faPlus}/>
				</ThemeIcon>
				<Text>{label}</Text>
			</Group>
		</UnstyledButton>
	);
}