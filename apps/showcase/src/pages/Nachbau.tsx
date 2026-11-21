import { useMemo } from 'react';
import {
	FinkChip,
	FinkGrid,
	FinkPageHeader,
	FinkPanel,
	FinkStack,
	FinkStatus,
	KolAccordion,
	KolAlert,
	KolBadge,
	KolButton,
	KolInputCheckbox,
	KolInputRadio,
	KolInputText,
	KolProgress,
	KolSelect,
	KolTableStateful,
	KolTextarea,
} from '@fink/react';
import { findReplicaSystem, replicaSystems, type ReplicaSystem } from '../catalog/systems';
import { t } from '../i18n';

const META: Record<string, string> = {
	porsche: 'Stil-Nachbau des Porsche Design System v4; Token aus designsystem.porsche.com.',
	scale: 'Stil-Nachbau von Telekom Scale; Token aus telekom/design-tokens.',
	ix: 'Stil-Nachbau von Siemens Industrial Experience; Token aus @siemens/ix 5.3.0 (classic-light/dark).',
	post: 'Stil-Nachbau des Swiss Post Design Systems; Token aus dem Tokens-Studio-Export.',
	db: 'Stil-Nachbau der DB UX Design System v3; Token aus @db-ui/foundations 0.7.4.',
	baloise: 'Stil-Nachbau des Baloise Design Systems; Token aus @baloise/design-system-tokens.',
	tegel: 'Stil-Nachbau von Tegel (Scania); Token aus color/_tokens.scss.',
	infineon: 'Stil-Nachbau des Infineon Design Systems; Token aus @infineon/design-system-tokens.',
	six: 'Stil-Nachbau der SIX UI Library; Token aus global/base/colors.css.',
	kern: 'Stil-Nachbau von KERN UX (Schleswig-Holstein); Token aus @kern-ux/native.',
	dyou: 'Stil-Nachbau von d-you (EUDI Wallet DE); Token aus KoliBri-PR #10970.',
};

const TABLE_HEADERS = {
	horizontal: [
		[
			{ label: t('Name'), key: 'name' },
			{ label: t('Rolle'), key: 'role' },
			{ label: t('Status'), key: 'active' },
		],
	],
} as never;

const TABLE_DATA = [
	{ name: t('Anna Weber'), role: t('Projektleitung'), active: t('Aktiv') },
	{ name: t('Ben Krüger'), role: t('Entwicklung'), active: t('Aktiv') },
	{ name: t('Cem Yildiz'), role: t('Support'), active: t('Deaktiviert') },
];

const RADIO_OPTIONS = [
	{ label: t('E-Mail'), value: 'mail' },
	{ label: t('Post'), value: 'post' },
];

const SELECT_OPTIONS = [
	{ label: t('Deutsch'), value: 'de' },
	{ label: t('Englisch'), value: 'en' },
];

/** Elemente-Matrix innerhalb eines Skins: dieselben Bausteine, der Look des nachgebauten Systems. */
function Matrix({ system }: { system: ReplicaSystem }) {
	return (
		<FinkStack _gap="4">
			<FinkStack _direction="row" _gap="2" _wrap>
				<KolButton _label={t('Primär')} _variant="primary" _icons="codicon codicon-play" />
				<KolButton _label={t('Sekundär')} _variant="secondary" />
				<KolButton _label={t('Neutral')} />
				<KolButton _label={t('Löschen')} _variant="danger" _icons="codicon codicon-trash" />
			</FinkStack>
			<FinkStack _direction="row" _gap="2" _wrap>
				<FinkChip _label={t('Chip')} />
				<FinkStatus _label={t('Status neu')} _tone="success" />
				<KolBadge _label={t('Kennzeichen')} />
			</FinkStack>
			<FinkStack _gap="3">
				<KolInputText _label={t('Kennzeichen')} _placeholder={t('z. B. AB-CD 123')} />
				<KolTextarea _label={t('Bemerkung')} _rows={3} />
				<KolSelect _label={t('Sprache')} _options={SELECT_OPTIONS} _value="de" />
				<KolInputRadio _label={t('Zustellung')} _options={RADIO_OPTIONS} _value="mail" />
				<KolInputCheckbox _label={t('Benachrichtigungen')} _variant="switch" />
			</FinkStack>
			<FinkStack _gap="2">
				<KolAlert _type="success" _label={t('Erfolg')}>{t('Der Vorgang wurde abgeschlossen.')}</KolAlert>
				<KolAlert _type="warning" _label={t('Warnung')}>{t('Der Vorrat ist knapp.')}</KolAlert>
				<KolAlert _type="error" _label={t('Fehler')}>{t('Der Vorgang konnte nicht abgeschlossen werden.')}</KolAlert>
				<KolAlert _type="info" _label={t('Hinweis')}>{t('Wartungsfenster: Freitag, 22 Uhr.')}</KolAlert>
			</FinkStack>
			<KolProgress _label={t('Fortschritt')} _value={62} _max={100} _unit="%" />
			<KolTableStateful _label={t('Personen')} _data={TABLE_DATA} _headers={TABLE_HEADERS} />
			<KolAccordion _label={t('Mehr erfahren')}>
				<p className="small">{META[system.id]}</p>
			</KolAccordion>
		</FinkStack>
	);
}

/** Detailseite eines Nachbau-Skins: Metadaten, Quellen und die Elemente-Matrix im Skin. */
export function NachbauDetail({ id }: { id: string }) {
	const system = findReplicaSystem(id);
	if (!system) return <Nachbau />;
	return (
		<>
			<FinkPageHeader
				_heading={t(system.label)}
				_description={t('{{company}} · Basis: {{tech}} · Lizenz: {{license}} · {{stars}} GitHub-Sterne', {
					company: system.company,
					tech: system.tech,
					license: system.license,
					stars: system.stars > 0 ? system.stars : t('keine Angabe'),
				})}
			/>
			<FinkStack _direction="row" _gap="3" _wrap>
				<a className="small" href={system.sourceUrl} target="_blank" rel="noreferrer">
					{t('Original-Quelle')} ↗
				</a>
				{system.docsUrl && (
					<a className="small" href={system.docsUrl} target="_blank" rel="noreferrer">
						{t('Original-Dokumentation')} ↗
					</a>
				)}
				<a className="small" href="#/nachbau">
					← {t('Alle Nachbau-Skins')}
				</a>
			</FinkStack>
			<p className="muted small">{META[system.id]} {t('Schrift: {{font}}.', { font: system.fontNote })}</p>
			{system.caveat && (
				<KolAlert _type="info" _label={t('Einschränkung')}>{system.caveat}</KolAlert>
			)}
			<KolAlert _type="warning" _label={t('Stil-Referenz, kein Markenprodukt')}>
				{t('Der Skin bildet Farben, Formen und Maße nach; Logos und Markenschriften sind nicht enthalten. Verhalten (Tastatur, Fokus, A11y) bleibt der Fink/KoliBri-Standard.')}
			</KolAlert>
			<section data-theme={system.id} className="replica-stage">
				<Matrix system={system} />
			</section>
		</>
	);
}

/** Übersicht aller Nachbau-Skins europäischer Design-Systeme. */
export function Nachbau() {
	const rows = useMemo(() => [...replicaSystems].sort((a, b) => b.stars - a.stars), []);
	return (
		<>
			<FinkPageHeader
				_heading={t('Nachbau-Skins')}
				_description={t('Offene Design-Systeme europäischer Unternehmen, nachgebaut auf Fink-Tokens: dieselben Elemente, derselbe Look, aber als frei einsetzbare Web-Components auf KoliBri. Lizenzierte Markenschriften sind ersetzt, Logos fließen nicht ein. Die Liste ist nach GitHub-Sternen geordnet (Stand 20.11.2026).')}
			/>
			<FinkGrid _min="17rem">
				{rows.map((system) => (
					<FinkPanel key={system.id} _heading={system.label} _level={3}>
						<FinkStack _gap="2">
							<span className="muted small">
								{system.company} · {system.tech} · {system.license}
								{system.stars > 0 ? ` · ${system.stars} ★` : ''}
							</span>
							<span className="muted small">{t('Schrift: {{font}}', { font: system.fontNote })}</span>
							<a href={`#/nachbau/${system.id}`}>{t('Skin ansehen')} →</a>
						</FinkStack>
					</FinkPanel>
				))}
			</FinkGrid>
			<p className="muted small">
				{t('Grundlage der Liste: ')}
				<a href="https://github.com/fink-design-system/fink-design-system/blob/main/docs/design-system-landschaft.md" target="_blank" rel="noreferrer">
					docs/design-system-landschaft.md
				</a>
				.
			</p>
		</>
	);
}
