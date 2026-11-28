import {
	FinkAlert,
	FinkButton,
	FinkConsentBanner,
	FinkDialog,
	FinkEmptyState,
	FinkGrid,
	FinkInputText,
	FinkPanel,
	FinkProgress,
	FinkResult,
	FinkSegmented,
	FinkSkeleton,
	FinkSpin,
	FinkStack,
	useToast,
} from '@fink-ui/react';
import { useEffect, useRef, useState } from 'react';
import { t } from '../i18n';
import type { PatternDefinition } from './types';

function SnackbarDemo() {
	const toast = useToast();
	const [items, setItems] = useState([t('Antrag FD-0141'), t('Antrag FD-0140'), t('Antrag FD-0139')]);
	return (
		<FinkStack _gap="4">
			<ul className="result-list">
				{items.map((item) => (
					<li key={item} className="row-between">
						<span>{item}</span>
						<FinkButton
							_label={t('{{item}} archivieren', { item })}
							_hideLabel
							_icons="codicon codicon-archive"
							_variant="tertiary"
							_on={{
								onClick: () => {
									setItems((list) => list.filter((i) => i !== item));
									toast.show({ type: 'success', label: t('Archiviert'), description: `${item} wurde archiviert.` });
								},
							}}
						/>
					</li>
				))}
			</ul>
			{items.length === 0 && (
				<FinkButton
					_label={t('Beispiele wiederherstellen')}
					_variant="tertiary"
					_on={{ onClick: () => setItems([t('Antrag FD-0141'), t('Antrag FD-0140'), t('Antrag FD-0139')]) }}
				/>
			)}
		</FinkStack>
	);
}

function BannersDemo() {
	const [visible, setVisible] = useState(true);
	const [consent, setConsent] = useState(0);
	return (
		<FinkStack _gap="4">
			{visible ? (
				<FinkAlert _type="warning" _variant="card" _label={t('Wartungsarbeiten am 20.11.')} _hasCloser _on={{ onClose: () => setVisible(false) }}>
					{t('Zwischen 18 und 22 Uhr ist das Portal nicht erreichbar. Gespeicherte Entwürfe bleiben erhalten.')}
				</FinkAlert>
			) : (
				<FinkButton _label={t('Banner wieder anzeigen')} _variant="tertiary" _on={{ onClick: () => setVisible(true) }} />
			)}
			<FinkAlert _type="info" _variant="msg">
				{t('Ihr Antrag wurde automatisch als Entwurf gespeichert.')}
			</FinkAlert>
			<FinkAlert _type="error" _variant="msg">
				{t('Die Verbindung zum Server wurde unterbrochen. Bitte versuchen Sie es erneut.')}
			</FinkAlert>
			<FinkConsentBanner key={consent} _position="inline" onFinkConsent={() => window.setTimeout(() => setConsent((c) => c + 1), 2500)} />
		</FinkStack>
	);
}

function DialogDemo() {
	const ref = useRef<HTMLKolDialogElement>(null);
	const toast = useToast();
	const [confirm, setConfirm] = useState('');
	const ok = confirm.trim() === t('LÖSCHEN');
	return (
		<>
			<FinkPanel _heading={t('Gefahrenzone')} _level={3}>
				<FinkStack _direction="row" _gap="3" _align="center" _justify="space-between">
					<span>{t('Konto und alle Anträge endgültig löschen.')}</span>
					<FinkButton _label={t('Konto löschen')} _variant="danger" _icons="codicon codicon-trash" _on={{ onClick: () => void ref.current?.openModal() }} />
				</FinkStack>
			</FinkPanel>
			<FinkDialog ref={ref} _label={t('Konto endgültig löschen?')} _width="30rem" _variant="card" _on={{ onClose: () => setConfirm('') }}>
				<FinkStack _gap="4">
					<p style={{ margin: 0 }}>{t('Alle Anträge, Nachrichten und Bescheide werden gelöscht. Das lässt sich nicht rückgängig machen.')}</p>
					<FinkInputText _label={t('Geben Sie LÖSCHEN ein, um zu bestätigen')} _value={confirm} _on={{ onInput: (_e, v) => setConfirm(String(v ?? '')) }} />
					<FinkStack _direction="row" _gap="2" _justify="end">
						<FinkButton _label={t('Abbrechen')} _on={{ onClick: () => void ref.current?.closeModal() }} />
						<FinkButton
							_label={t('Endgültig löschen')}
							_variant="danger"
							_disabled={!ok}
							_on={{
								onClick: () => {
									void ref.current?.closeModal();
									toast.show({ type: 'success', label: t('Konto gelöscht'), description: t('(Demo – es wurde nichts gelöscht.)') });
								},
							}}
						/>
					</FinkStack>
				</FinkStack>
			</FinkDialog>
		</>
	);
}

function EmptyStatesDemo() {
	const [variant, setVariant] = useState('first');
	return (
		<FinkStack _gap="4">
			<FinkSegmented
				_label={t('Art des Leerzustands')}
				_value={variant}
				onFinkChange={(e) => setVariant(e.detail)}
				_options={[
					{ value: 'first', label: t('Erste Nutzung') },
					{ value: 'search', label: t('Keine Treffer') },
					{ value: 'done', label: t('Alles erledigt') },
				]}
			/>
			{variant === 'first' && (
				<FinkEmptyState
					_heading={t('Noch keine Anträge')}
					_description={t('Hier erscheinen Ihre Anträge, sobald Sie den ersten gestellt haben.')}
					_icons="codicon codicon-new-file"
					_level={3}
				>
					<FinkButton _label={t('Ersten Antrag stellen')} _variant="primary" _icons="codicon codicon-add" />
				</FinkEmptyState>
			)}
			{variant === 'search' && (
				<FinkEmptyState
					_heading={t('Keine Treffer für „Steuerbescheid 2019“')}
					_description={t('Prüfen Sie die Schreibweise oder entfernen Sie Filter.')}
					_level={3}
				>
					<FinkButton _label={t('Filter zurücksetzen')} _variant="primary" />
				</FinkEmptyState>
			)}
			{variant === 'done' && (
				<FinkEmptyState
					_heading={t('Alles erledigt')}
					_description={t('Es gibt keine offenen Aufgaben. Gut gemacht!')}
					_icons="codicon codicon-check-all"
					_level={3}
				/>
			)}
		</FinkStack>
	);
}

function LoadingDemo() {
	const [loading, setLoading] = useState(true);
	const [progress, setProgress] = useState(0);
	useEffect(() => {
		if (!loading) return;
		setProgress(0);
		const id = window.setInterval(() => setProgress((p) => (p >= 100 ? 100 : p + 20)), 350);
		const done = window.setTimeout(() => setLoading(false), 2000);
		return () => {
			window.clearInterval(id);
			window.clearTimeout(done);
		};
	}, [loading]);
	return (
		<FinkStack _gap="4">
			<FinkStack _direction="row" _gap="3" _align="center">
				<FinkButton _label={t('Neu laden')} _icons="codicon codicon-refresh" _disabled={loading} _on={{ onClick: () => setLoading(true) }} />
				<FinkSpin _show={loading} _variant="cycle" _label={t('Daten werden geladen')} />
			</FinkStack>
			<FinkProgress _label={t('Upload')} _value={progress} _max={100} _unit="%" _variant="bar" />
			<FinkGrid _min="14rem" _gap="3">
				{[1, 2, 3].map((n) =>
					loading ? (
						<div key={n} className="skeleton-card">
							<FinkSkeleton _variant="rect" _height="6rem" _label={n === 1 ? t('Inhalte werden geladen') : undefined} />
							<FinkSkeleton _lines={2} />
						</div>
					) : (
						<FinkPanel key={n} _heading={t('Programm {{n}}', { n })} _level={3}>
							{t('Geladene Inhalte erscheinen ohne Layoutsprung.')}
						</FinkPanel>
					),
				)}
			</FinkGrid>
		</FinkStack>
	);
}

function ResultDemo() {
	const [variant, setVariant] = useState<'success' | 'not-found' | 'unavailable' | 'error'>('success');
	const texts = {
		success: { heading: t('Antrag eingereicht'), description: t('Sie erhalten eine Bestätigung per E-Mail. Die Bearbeitung dauert etwa 10 Arbeitstage.') },
		'not-found': { heading: t('Seite nicht gefunden'), description: t('Prüfen Sie die Adresse. Wenn Sie einem Link gefolgt sind, ist er womöglich veraltet.') },
		unavailable: {
			heading: t('Dienst vorübergehend nicht verfügbar'),
			description: t('Wir arbeiten daran. Bitte versuchen Sie es ab 22 Uhr erneut. Ihre Eingaben wurden gespeichert.'),
		},
		error: {
			heading: t('Es ist ein Problem aufgetreten'),
			description: t('Ihre Eingaben konnten nicht gespeichert werden. Bitte versuchen Sie es später erneut.'),
		},
	}[variant];
	return (
		<FinkStack _gap="4">
			<FinkSegmented
				_label={t('Ergebnis')}
				_value={variant}
				onFinkChange={(e) => setVariant(e.detail as typeof variant)}
				_options={[
					{ value: 'success', label: t('Bestätigung') },
					{ value: 'not-found', label: '404' },
					{ value: 'unavailable', label: t('Nicht verfügbar') },
					{ value: 'error', label: t('Fehler') },
				]}
			/>
			<FinkResult
				_variant={variant}
				_heading={texts.heading}
				_description={texts.description}
				_reference={variant === 'success' ? 'FD-2026-0143' : undefined}
				_level={3}
			>
				<FinkButton _label={variant === 'success' ? t('Zur Übersicht') : 'Zur Startseite'} _variant="primary" />
			</FinkResult>
		</FinkStack>
	);
}

export const feedbackPatterns: PatternDefinition[] = [
	{
		id: 'snackbar',
		number: 25,
		title: t('Snackbar & Toast'),
		category: 'Feedback & Status',
		icon: 'codicon codicon-bell',
		summary: t('Kurze, nicht blockierende Bestätigung nach einer Aktion.'),
		problem: t('Nutzende brauchen eine Rückmeldung, dass eine Aktion erfolgreich war, ohne unterbrochen zu werden.'),
		when: [t('Bestätigung abgeschlossener Aktionen (gespeichert, archiviert).')],
		avoid: [t('Kritische Fehler, die eine Entscheidung erfordern (dort Dialog oder Banner).')],
		components: ['fink-toast-container', 'fink-button'],
		a11y: [t('Toasts werden als Statusmeldung angesagt und bleiben lange genug sichtbar.')],
		sources: [
			{ system: 'Material 3', name: 'Snackbar' },
			{ system: 'MUI', name: 'Snackbar' },
			{ system: 'Vuetify', name: 'v-snackbar' },
			{ system: 'Carbon', name: 'Notification (toast)' },
		],
		demo: () => <SnackbarDemo />,
		code: {
			react: `const toast = useToast();

toast.show({ type: 'success', label: 'Archiviert', description: 'FD-0141 wurde archiviert.' });`,
			html: `<script type="module">
  import { ToasterService } from '@public-ui/components';
  ToasterService.getInstance(document).enqueue({ type: 'success', label: 'Archiviert' });
</script>`,
		},
	},
	{
		id: 'banners',
		number: 26,
		title: t('Banner, Meldungen & Einwilligung'),
		category: 'Feedback & Status',
		icon: 'codicon codicon-megaphone',
		summary: t('Seitenweite Hinweise, Inline-Meldungen und Cookie-Einwilligung.'),
		problem: t('Wichtige Hinweise müssen sichtbar sein, ohne die Arbeit zu blockieren.'),
		when: ['Wartungshinweise, Systemstatus, Kontextmeldungen, Einwilligungen.'],
		avoid: [t('Mehrere Banner übereinander.')],
		components: ['fink-alert', 'fink-consent-banner'],
		a11y: [t('Schließbare Banner mit Label „Schließen“.'), 'Einwilligungsoptionen gleichwertig, ohne Vorauswahl.'],
		sources: [
			{ system: 'MUI', name: 'Alert' },
			{ system: 'Vuetify', name: 'v-banner / v-alert' },
			{ system: 'Atlassian', name: 'Banner / Section message' },
			{ system: 'GOV.UK', name: 'Cookie banner' },
		],
		demo: () => <BannersDemo />,
		code: {
			react: `<FinkAlert _type="warning" _variant="card" _label="Wartungsarbeiten am 20.11." _hasCloser
  _on={{ onClose: dismiss }}>
  Zwischen 18 und 22 Uhr ist das Portal nicht erreichbar.
</FinkAlert>
<FinkAlert _type="info" _variant="msg">Als Entwurf gespeichert.</FinkAlert>
<FinkConsentBanner onFinkConsent={(e) => saveConsent(e.detail)} />`,
			html: `<fink-alert _type="warning" _variant="card" _label="Wartungsarbeiten" _has-closer>…</fink-alert>
<fink-consent-banner></fink-consent-banner>`,
		},
	},
	{
		id: 'dialogs',
		number: 27,
		title: t('Dialog & Bestätigung'),
		category: 'Feedback & Status',
		icon: 'codicon codicon-multiple-windows',
		summary: t('Destruktive Aktionen mit modalem Dialog und Tipp-Bestätigung absichern.'),
		problem: t('Unumkehrbare Aktionen dürfen nicht versehentlich ausgelöst werden.'),
		when: [t('Löschen, endgültiges Absenden, Kostenpflichtiges.')],
		avoid: [t('Dialoge für Informationen ohne Entscheidung.'), 'Dialog in Dialog.'],
		components: ['fink-dialog', 'fink-button', 'fink-input-text', 'fink-panel'],
		a11y: [t('Fokusfalle, Escape schließt, Fokus kehrt zum Auslöser zurück (HTML dialog).'), 'Konkreter Aktionsname statt „OK“.'],
		sources: [
			{ system: 'Material 3', name: 'Dialogs' },
			{ system: 'MUI', name: 'Dialog' },
			{ system: 'Vuetify', name: 'v-dialog' },
			{ system: 'Carbon', name: 'Dialogs – danger modal' },
		],
		demo: () => <DialogDemo />,
		code: {
			react: `const ref = useRef<HTMLKolDialogElement>(null);

<FinkButton _label="Konto löschen" _variant="danger" _on={{ onClick: () => ref.current?.openModal() }} />
<FinkDialog ref={ref} _label="Konto endgültig löschen?" _variant="card">
  <FinkInputText _label="Geben Sie LÖSCHEN ein, um zu bestätigen" … />
  <FinkButton _label="Abbrechen" _on={{ onClick: () => ref.current?.closeModal() }} />
  <FinkButton _label="Endgültig löschen" _variant="danger" _disabled={!confirmed} />
</FinkDialog>`,
		},
	},
	{
		id: 'empty-states',
		number: 28,
		title: t('Leerzustände'),
		category: 'Feedback & Status',
		icon: 'codicon codicon-inbox',
		summary: t('Erste Nutzung, keine Treffer, alles erledigt – jeweils mit Erklärung und nächstem Schritt.'),
		problem: t('Leere Bereiche wirken wie Fehler und lassen Nutzende ratlos zurück.'),
		when: ['Listen ohne Inhalt, Suchen ohne Treffer, erledigte Aufgaben.'],
		components: ['fink-empty-state', 'fink-segmented', 'fink-button'],
		a11y: [t('Überschrift erklärt den Zustand; Aktion als echter Button.')],
		sources: [
			{ system: 'Vuetify', name: 'v-empty-state' },
			{ system: 'Carbon', name: 'Empty states' },
			{ system: 'Atlassian', name: 'Empty state' },
			{ system: 'Polaris', name: 'Empty state' },
		],
		demo: () => <EmptyStatesDemo />,
		code: {
			react: `<FinkEmptyState
  _heading="Noch keine Anträge"
  _description="Hier erscheinen Ihre Anträge, sobald Sie den ersten gestellt haben."
  _icons="codicon codicon-new-file"
>
  <FinkButton _label="Ersten Antrag stellen" _variant="primary" />
</FinkEmptyState>`,
			html: `<fink-empty-state _heading="Noch keine Anträge" _icons="codicon codicon-new-file">
  <fink-button _label="Ersten Antrag stellen" _variant="primary"></fink-button>
</fink-empty-state>`,
		},
	},
	{
		id: 'loading',
		number: 29,
		title: t('Ladezustände'),
		category: 'Feedback & Status',
		icon: 'codicon codicon-loading',
		summary: t('Skeletons für Inhalte, Spinner für kurze Aktionen, Fortschrittsbalken für messbare Vorgänge.'),
		problem: t('Wartezeiten ohne Rückmeldung wirken wie ein Absturz; springende Layouts stören.'),
		when: ['Skeleton: Inhalte > 300 ms.', 'Spinner: kurze Aktionen.', 'Progress: Uploads, Exporte.'],
		components: ['fink-skeleton', 'fink-spin', 'fink-progress'],
		a11y: [t('Ladezustand einmal ansagen (role="status"), nicht pro Platzhalter.'), 'Animation bei reduzierter Bewegung abschalten.'],
		sources: [
			{ system: 'MUI', name: 'Skeleton / Progress' },
			{ system: 'Vuetify', name: 'v-skeleton-loader / v-progress-linear' },
			{ system: 'Material 3', name: 'Progress indicators' },
			{ system: 'Carbon', name: 'Loading pattern' },
		],
		demo: () => <LoadingDemo />,
		code: {
			react: `{loading ? (
  <>
    <FinkSkeleton _variant="rect" _height="6rem" _label="Inhalte werden geladen" />
    <FinkSkeleton _lines={2} />
  </>
) : (
  <Content />
)}
<FinkSpin _show={saving} _label="Wird gespeichert" />
<FinkProgress _label="Upload" _value={64} _max={100} _unit="%" />`,
			html: `<fink-skeleton _variant="rect" _height="6rem" _label="Inhalte werden geladen"></fink-skeleton>`,
		},
	},
	{
		id: 'result-pages',
		number: 30,
		title: t('Bestätigungs- & Fehlerseiten'),
		category: 'Feedback & Status',
		icon: 'codicon codicon-pass',
		summary: t('Abschluss mit Vorgangsnummer sowie 404, „Dienst nicht verfügbar“ und allgemeine Fehler.'),
		problem: t('Nach dem Absenden brauchen Nutzende Gewissheit; bei Fehlern einen Ausweg.'),
		when: ['Ende von Transaktionen.', 'Technische Fehlerseiten.'],
		components: ['fink-result', 'fink-button'],
		a11y: [t('Seitentitel und h1 benennen das Ergebnis.'), t('Vorgangsnummer als Text, nicht nur als Bild.')],
		sources: [
			{ system: 'GOV.UK', name: 'Confirmation pages / Page not found / Service unavailable' },
			{ system: 'Ant Design', name: 'Result' },
		],
		demo: () => <ResultDemo />,
		code: {
			react: `<FinkResult
  _variant="success"
  _heading="Antrag eingereicht"
  _reference="FD-2026-0143"
  _description="Sie erhalten eine Bestätigung per E-Mail."
>
  <FinkButton _label="Zur Übersicht" _variant="primary" />
</FinkResult>

<FinkResult _variant="not-found" _heading="Seite nicht gefunden" />`,
			html: `<fink-result _variant="success" _heading="Antrag eingereicht" _reference="FD-2026-0143"></fink-result>`,
		},
	},
];
