/**
 * Messseite für Renderzeit und Speicher: registriert Fink und KoliBri ohne React. Das Messskript fügt danach
 * viele Komponenten ein (mit und ohne Icons). Prüfstand, zählt nicht zum Aufwand.
 */
import '@fink/tokens/tokens.css';
import '../shared/page.css';
import { registerFink } from '@fink/theme';

declare global {
	interface Window {
		kolibriReady?: Promise<unknown>;
	}
}

window.kolibriReady = registerFink({ language: 'de' });
