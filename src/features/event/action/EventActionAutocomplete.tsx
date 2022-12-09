import {useState} from 'react';
import {Autocomplete, AutocompleteProps} from '@mantine/core';
import {useFormContext} from '../../../contexts/event/action/EventActionFormContext';
import {useEditMode} from '../../../contexts/event/action/EditModeContext';
import {InlineEditableAutocomplete} from '../../../components/Input/InlineEditable/InlineEditables';
import {useEventTextChange} from './useEventUpdate';
import {TextKey} from '../../../contexts/language/Language';
import {useTranslationIfPresent} from '../../../utils/translationHelper';

interface TranslatableAutocompleteProps extends AutocompleteProps {
	label?: TextKey;
	placeholder?: TextKey;
}

type FormTextInputProps = {
	inputProps: TranslatableAutocompleteProps;
	formPath: string;
	/** Forces edit mode in form context **/
	overrideFormContextEditMode?: boolean;
};

export function EventActionAutocomplete(props: FormTextInputProps): JSX.Element {
	const {inputProps, formPath, overrideFormContextEditMode = false} = props;
	const form = useFormContext(overrideFormContextEditMode ? true : undefined);
	const formInputProps = form.getInputProps(formPath);

	const [oldValue, setOldValue] = useState<string>(formInputProps.value || '');
	const {mutate} = useEventTextChange(formPath, formInputProps.value, setOldValue);

	useTranslationIfPresent(inputProps, ['label', 'placeholder']);
	return <>
		{useEditMode() ?
			<InlineEditableAutocomplete {...inputProps} position={'group'} {...formInputProps}
										onSubmit={mutate} onCancel={() => form.setFieldValue(formPath, oldValue)}/>
			:
			<Autocomplete {...inputProps} {...formInputProps}/>
		}
	</>;
}
