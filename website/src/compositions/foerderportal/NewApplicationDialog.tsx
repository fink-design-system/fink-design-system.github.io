import {
	FinkAlert,
	FinkButton,
	FinkDialog,
	FinkInputCheckbox,
	FinkInputEmail,
	FinkInputNumber,
	FinkInputText,
	FinkSingleSelect,
	FinkStack,
	FinkStepper,
	FinkTextarea,
} from '@fink-ui/react';
import { useEffect, useRef, useState } from 'react';
import { t } from '../../i18n';
import { PROGRAMS, euro, type Application, type ProgramId } from './data';

interface FormState {
	applicant: string;
	contact: string;
	email: string;
	city: string;
	program: ProgramId | '';
	amount: number | null;
	description: string;
	confirmed: boolean;
}

const empty: FormState = { applicant: '', contact: '', email: '', city: '', program: '', amount: null, description: '', confirmed: false };

const STEPS = ['Antragsteller', 'Vorhaben', t('Prüfen & Absenden')];

const PROGRAM_OPTIONS = (Object.keys(PROGRAMS) as ProgramId[]).map((id) => ({ label: PROGRAMS[id].label, value: id }));

const FIELDS_BY_STEP: Array<Array<keyof FormState>> = [['applicant', 'contact', 'email', 'city'], ['program', 'amount', 'description'], ['confirmed']];

const validate = (form: FormState): Partial<Record<keyof FormState, string>> => {
	const errors: Partial<Record<keyof FormState, string>> = {};
	if (form.applicant.trim().length < 3) errors.applicant = t('Bitte den Namen der Organisation angeben (mind. 3 Zeichen).');
	if (form.contact.trim().length < 3) errors.contact = t('Bitte eine Ansprechperson angeben.');
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = t('Bitte eine gültige E-Mail-Adresse angeben.');
	if (form.city.trim().length < 2) errors.city = t('Bitte den Ort angeben.');
	if (!form.program) errors.program = t('Bitte ein Förderprogramm wählen.');
	if (form.amount === null || Number.isNaN(form.amount) || form.amount < 1000 || form.amount > 100000)
		errors.amount = t('Die Fördersumme muss zwischen 1.000 € und 100.000 € liegen.');
	if (form.description.trim().length < 20) errors.description = t('Bitte das Vorhaben in mindestens 20 Zeichen beschreiben.');
	if (!form.confirmed) errors.confirmed = t('Bitte die Richtigkeit der Angaben bestätigen.');
	return errors;
};

interface Props {
	open: boolean;
	onClose: () => void;
	onSubmit: (input: Omit<Application, 'id' | 'received' | 'status' | 'history'>) => void;
}

/** Mehrstufiger Antragsdialog: FinkDialog + FinkStepper + KoliBri-Formularfelder mit Validierung. */
export function NewApplicationDialog({ open, onClose, onSubmit }: Props) {
	const ref = useRef<HTMLKolDialogElement>(null);
	const [step, setStep] = useState(0);
	const [form, setForm] = useState<FormState>(empty);
	const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
	const [showSummary, setShowSummary] = useState(false);

	useEffect(() => {
		if (open) {
			setStep(0);
			setForm(empty);
			setTouched({});
			setShowSummary(false);
			void ref.current?.openModal();
		} else {
			void ref.current?.closeModal();
		}
	}, [open]);

	const errors = validate(form);
	const stepErrors = FIELDS_BY_STEP[step].filter((field) => errors[field]);
	const update = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm((current) => ({ ...current, [key]: value }));
	const touch = (key: keyof FormState) => setTouched((current) => ({ ...current, [key]: true }));
	const msg = (key: keyof FormState) => (touched[key] && errors[key] ? { _type: 'error' as const, _description: errors[key]! } : undefined);

	const next = () => {
		setTouched((current) => ({ ...current, ...Object.fromEntries(FIELDS_BY_STEP[step].map((field) => [field, true])) }));
		if (stepErrors.length > 0) {
			setShowSummary(true);
			return;
		}
		setShowSummary(false);
		if (step < STEPS.length - 1) {
			setStep(step + 1);
			return;
		}
		onSubmit({
			applicant: form.applicant.trim(),
			contact: form.contact.trim(),
			email: form.email.trim(),
			city: form.city.trim(),
			program: form.program as ProgramId,
			amount: form.amount ?? 0,
			description: form.description.trim(),
		});
	};

	return (
		<FinkDialog ref={ref} _label={t('Neuen Antrag stellen')} _width="44rem" _variant="card" _on={{ onClose }}>
			<FinkStack _gap="5">
				<FinkStepper _steps={STEPS} _current={step} _clickable _label={t('Antragsschritte')} onFinkStepChange={(event) => setStep(event.detail)} />

				{showSummary && stepErrors.length > 0 && (
					<FinkAlert _type="error" _variant="card" _label={t('Bitte prüfe deine Angaben')} _level={0}>
						<ul style={{ margin: 0, paddingInlineStart: '1.25rem' }}>
							{stepErrors.map((field) => (
								<li key={field}>{errors[field]}</li>
							))}
						</ul>
					</FinkAlert>
				)}

				{step === 0 && (
					<FinkStack _gap="4">
						<FinkInputText
							_label={t('Organisation')}
							_required
							_value={form.applicant}
							_touched={touched.applicant}
							_msg={msg('applicant')}
							_on={{ onInput: (_e, value) => update('applicant', String(value ?? '')), onBlur: () => touch('applicant') }}
						/>
						<FinkInputText
							_label={t('Ansprechperson')}
							_required
							_value={form.contact}
							_touched={touched.contact}
							_msg={msg('contact')}
							_on={{ onInput: (_e, value) => update('contact', String(value ?? '')), onBlur: () => touch('contact') }}
						/>
						<FinkInputEmail
							_label={t('E-Mail-Adresse')}
							_required
							_value={form.email}
							_touched={touched.email}
							_msg={msg('email')}
							_hint={t('An diese Adresse senden wir die Eingangsbestätigung.')}
							_on={{ onInput: (_e, value) => update('email', String(value ?? '')), onBlur: () => touch('email') }}
						/>
						<FinkInputText
							_label={t('Ort')}
							_required
							_value={form.city}
							_touched={touched.city}
							_msg={msg('city')}
							_on={{ onInput: (_e, value) => update('city', String(value ?? '')), onBlur: () => touch('city') }}
						/>
					</FinkStack>
				)}

				{step === 1 && (
					<FinkStack _gap="4">
						<FinkSingleSelect
							_label={t('Förderprogramm')}
							_required
							_placeholder={t('Bitte wählen')}
							_options={PROGRAM_OPTIONS}
							_value={form.program}
							_touched={touched.program}
							_msg={msg('program')}
							_on={{
								onChange: (_e, value) => {
									update('program', (value ?? '') as ProgramId | '');
									touch('program');
								},
							}}
						/>
						<FinkInputNumber
							_label={t('Beantragte Fördersumme in Euro')}
							_required
							_min={1000}
							_max={100000}
							_step={500}
							_value={form.amount ?? undefined}
							_touched={touched.amount}
							_msg={msg('amount')}
							_hint={t('Zwischen 1.000 € und 100.000 €')}
							_on={{ onInput: (_e, value) => update('amount', value === null || value === '' ? null : Number(value)), onBlur: () => touch('amount') }}
						/>
						<FinkTextarea
							_label={t('Beschreibung des Vorhabens')}
							_required
							_rows={4}
							_hasCounter
							_maxLength={600}
							_value={form.description}
							_touched={touched.description}
							_msg={msg('description')}
							_on={{ onInput: (_e, value) => update('description', String(value ?? '')), onBlur: () => touch('description') }}
						/>
					</FinkStack>
				)}

				{step === 2 && (
					<FinkStack _gap="4">
						<dl className="detail-list">
							<dt>{t('Organisation')}</dt>
							<dd>{form.applicant}</dd>
							<dt>{t('Ansprechperson')}</dt>
							<dd>
								{form.contact} · {form.email}
							</dd>
							<dt>{t('Ort')}</dt>
							<dd>{form.city}</dd>
							<dt>{t('Programm')}</dt>
							<dd>{form.program ? PROGRAMS[form.program].label : '–'}</dd>
							<dt>{t('Fördersumme')}</dt>
							<dd>{form.amount ? euro(form.amount) : '–'}</dd>
							<dt>{t('Vorhaben')}</dt>
							<dd>{form.description}</dd>
						</dl>
						<FinkInputCheckbox
							_label={t('Ich bestätige, dass alle Angaben vollständig und richtig sind.')}
							_required
							_checked={form.confirmed}
							_touched={touched.confirmed}
							_msg={msg('confirmed')}
							_on={{
								onChange: (_e, value) => {
									update('confirmed', Boolean(value));
									touch('confirmed');
								},
							}}
						/>
					</FinkStack>
				)}

				<FinkStack _direction="row" _gap="2" _justify="space-between">
					<FinkButton _label={t('Abbrechen')} _variant="tertiary" _on={{ onClick: onClose }} />
					<FinkStack _direction="row" _gap="2">
						{step > 0 && <FinkButton _label={t('Zurück')} _icons="codicon codicon-arrow-left" _on={{ onClick: () => setStep(step - 1) }} />}
						<FinkButton
							_label={step === STEPS.length - 1 ? t('Antrag absenden') : t('Weiter')}
							_variant="primary"
							_icons={step === STEPS.length - 1 ? 'codicon codicon-send' : 'codicon codicon-arrow-right'}
							_on={{ onClick: next }}
						/>
					</FinkStack>
				</FinkStack>
			</FinkStack>
		</FinkDialog>
	);
}
