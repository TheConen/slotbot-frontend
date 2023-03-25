import slotbotServerClient from '../../../hooks/slotbotServerClient';
import {useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {useEventPage} from '../../../contexts/event/EventPageContext';
import {EventEditDto} from '../eventTypes';
import {errorNotification, successNotification} from '../../../utils/notificationHelper';
import {useFormContext} from '../../../contexts/event/action/EventActionFormContext';
import {useEditMode} from '../../../contexts/event/action/EditModeContext';
import {usePrevious} from '@mantine/hooks';
import {useEffect} from 'react';
import {convertUtcDateTimeToLocal} from '../../../utils/dateHelper';

export function useEventTextChange(formPath: string, value: string, onSuccess?: (saved: string) => void) {
	const eventId = useEventPage();
	const postTextChange = () => slotbotServerClient.put(`/events/${eventId}/edit/text`, {
		[formPath]: value,
	}).then((res) => res.data);
	const {mutate} = useMutation<EventEditDto, AxiosError>(postTextChange, {
		onSuccess: (response) => {
			// @ts-ignore Posted it like that, so response is the same format
			onSuccess?.(response[formPath]);
			// @ts-ignore
			successNotification(response[formPath]);
		},
		onError: errorNotification,
	});

	return {mutate};
}

export function useEventUpdate(data: unknown, onSuccess?: (saved: EventEditDto) => void) {
	const eventId = useEventPage();
	const postEventUpdate = () => slotbotServerClient.put(`/events/${eventId}`, data).then((res) => res.data);
	const {mutate} = useMutation<EventEditDto, AxiosError>(postEventUpdate, getEventEditMutationOptions(onSuccess));

	return {mutate};
}

export function useEventSlotListUpdate(data: unknown, onSuccess?: (saved: EventEditDto) => void) {
	const eventId = useEventPage();
	const postEventUpdate = () => slotbotServerClient.put(`/events/${eventId}/slotlist`, data).then((res) => res.data);
	const {mutate} = useMutation<EventEditDto, AxiosError>(postEventUpdate, getEventEditMutationOptions(onSuccess));

	return {mutate};
}

/**
 * Mutation options for event updates. Converts utc times to local data and shows result-notifications.
 */
function getEventEditMutationOptions(onSuccess?: (saved: EventEditDto) => void) {
	return {
		onSuccess: (response: EventEditDto) => {
			onSuccess?.({...response, dateTime: convertUtcDateTimeToLocal(response.dateTime)});
			successNotification();
		},
		onError: errorNotification,
	};
}

export function useChangeWatcher(field: string) {
	const form = useFormContext();
	const editMode = useEditMode();

	// @ts-ignore
	const formValue = form.values[field];
	const {mutate} = useEventUpdate({[field]: formValue},
		// @ts-ignore
		result => form.setFieldValue(field, result[field]));
	const previous = usePrevious(formValue);
	useEffect(() => {
		if (!editMode || previous === undefined || previous === formValue || !form.isValid(field)) return;
		mutate();
	}, [formValue]);
}
