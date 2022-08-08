import {Autocomplete, Grid, Select, Stack, TextInput, Title} from '@mantine/core';
import {TextInputMaxLength} from '../../../components/Form/MaxLength/TextInputMaxLength';
import {EMBEDDABLE_DESCRIPTION, TEXT, URL} from '../../../utils/maxLength';
import {IconSwitch} from '../../../components/Form/IconSwitch';
import {faCalendarDay, faClock, faEye, faEyeSlash, faUsers, faUsersSlash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {DatePicker, TimeInput} from '@mantine/dates';
import {EventTypeMask} from './EventTypeMask';
import {TextareaMaxLength} from '../../../components/Form/MaxLength/TextareaMaxLength';
import {EventWizardStepProps} from './EventWizard';
import {TextWithInfo} from '../../../components/Text/TextWithInfo';


export function EventWizardStepOne(props: EventWizardStepProps): JSX.Element {
	const {form} = props;

	return (
		<>
			<Title order={2} mb={'xs'}>Allgemeine Informationen</Title>

			<Grid>
				<Grid.Col span={9}>
					<TextInputMaxLength label={'Titel'} placeholder={'Event Name'} maxLength={TEXT} required
										useFormReturn={form} inputProp={'name'}/>
				</Grid.Col>
				<Grid.Col span={3}>
					<Stack align={'flex-start'} spacing={'xs'}>
						<IconSwitch onIcon={faUsers} offIcon={faUsersSlash}
									label={<TextWithInfo text={'Teilen erlauben'}
														 tooltip={'Ermöglicht es anderen Gruppen diese Event in ihren Kalender einzufügen und darüber Teilnehmer einzutragen.'}/>}
									useFormReturn={form} inputProp={'shareable'}/>

						<IconSwitch onIcon={faEye} offIcon={faEyeSlash}
									label={<TextWithInfo text={'Sichtbarkeit'}
														 tooltip={'Berechtigt alle Interessierten das Event im Kalender zu sehen.'}/>}
									useFormReturn={form} inputProp={'hidden'}/>
					</Stack>
				</Grid.Col>
			</Grid>
			<Grid>
				<Grid.Col span={4}>
					<DatePicker allowFreeInput minDate={new Date()} clearable={false} required
								label={'Datum'} icon={<FontAwesomeIcon icon={faCalendarDay}/>}
								placeholder={'Event Datum'} {...form.getInputProps('date')}/>
				</Grid.Col>
				<Grid.Col span={4}>
					<TimeInput clearable={false} required label={'Startzeit'}
							   icon={<FontAwesomeIcon icon={faClock}/>} placeholder={'Event Datum'}
							   {...form.getInputProps('startTime')}/>
				</Grid.Col>
				<Grid.Col span={4}>
					<TextInputMaxLength label={'Ersteller'} maxLength={TEXT} required
										useFormReturn={form} inputProp={'creator'}/>
				</Grid.Col>
			</Grid>
			<EventTypeMask form={form}/>
			<TextareaMaxLength label={'Beschreibung'} placeholder={'Beschreibung'} autosize minRows={3}
							   maxLength={EMBEDDABLE_DESCRIPTION}
							   useFormReturn={form} inputProp={'description'}/>
			<Grid>
				<Grid.Col span={4}>
					<Select label={'Missionstyp'} placeholder={'Auswählen...'}
							data={['COOP', 'COOP+', 'Zeus', 'TvT', 'Training', 'Spezial', 'Anderes']}
							{...form.getInputProps('missionType')}/>
				</Grid.Col>
				<Grid.Col span={4}>
					<Autocomplete label={'Missionslänge'} placeholder={'Freitext'} maxLength={TEXT}
								  data={['2 Stunden', '3 Stunden', 'über 4 Stunden']}
								  {...form.getInputProps('missionLength')}/>
				</Grid.Col>
				<Grid.Col span={4}>
					<TextInput label={'Bild-URL'} maxLength={URL} {...form.getInputProps('pictureUrl')}/>
				</Grid.Col>
			</Grid>
		</>
	);
}
