/** Englische Texte der Seite Getting Started. */
export const gettingStarted: Record<string, string> = {
	'Getting Started': 'Getting started',
	'Fink in fünf Minuten in eine Anwendung bringen – ohne Framework, mit React, Vue oder Angular.':
		'Bring Fink into an application in five minutes – without a framework, with React, Vue or Angular.',
	'Immer dasselbe Muster': 'Always the same pattern',
	'Ein Paket installieren. KoliBri, Theme und Tokens kommen als Abhängigkeiten mit.':
		'Install one package. KoliBri, theme and tokens come along as dependencies.',
	'Ein Stylesheet laden: fink.css (Icon-Fonts, Design Tokens, Seitenschrift).': 'Load one stylesheet: fink.css (icon fonts, design tokens, page font).',
	'Einmal beim Start registrieren: defineCustomElements().': 'Register once at startup: defineCustomElements().',
	'Komponenten nutzen: Im DOM heißt alles fink-*, in React, Vue und Angular heißen alle Komponenten Fink*.':
		'Use the components: in the DOM everything is called fink-*, in React, Vue and Angular all components are called Fink*.',
	'Sprache und Theme liest die Bibliothek beim Registrieren von <html>: lang="de" oder lang="en", optional data-theme. Das Farbschema folgt color-scheme am Dokument.':
		'The library reads language and theme from <html> when registering: lang="de" or lang="en", optionally data-theme. The colour scheme follows color-scheme on the document.',
	'Ohne Framework und ohne Bundler: Stylesheet und ESM-Build direkt einbinden, die Elemente heißen fink-*.':
		'Without a framework and without a bundler: include the stylesheet and the ESM build directly, the elements are called fink-*.',
	'Text-Props stehen als Attribut im Markup, Props mit Objekten oder Funktionen (z. B. _on) werden als Property gesetzt.':
		'Text props are attributes in the markup, props with objects or functions (e.g. _on) are set as properties.',
	'Events der eigenen Komponenten sind DOM-Events in camelCase, z. B. finkTaskSelect.':
		'Events of the own components are DOM events in camelCase, e.g. finkTaskSelect.',
	'Alle Komponenten heißen Fink*, die von KoliBri (FinkButton) wie die eigenen (FinkTaskList).':
		"All components are called Fink*, KoliBri's (FinkButton) as well as the own ones (FinkTaskList).",
	'Statt defineCustomElements() kann FinkProvider die App umschließen: Er registriert selbst und verwaltet Farbschema, Theme und Sprache.':
		'Instead of defineCustomElements(), FinkProvider can wrap the app: it registers on its own and manages colour scheme, theme and language.',
	'Server-Rendering (Next.js, React Router): den Fink-Teil erst im Client rendern, nachdem defineCustomElements() gelaufen ist.':
		'Server rendering (Next.js, React Router): render the Fink part on the client only, after defineCustomElements() has run.',
	'Props mit Objekten binden (:_on, :_tasks), Events in camelCase (@finkTaskSelect).':
		'Bind props with objects (:_on, :_tasks), events in camelCase (@finkTaskSelect).',
	'Nuxt: Registrierung als Client-Plugin und den Fink-Teil in <ClientOnly>.': 'Nuxt: register in a client plugin and put the Fink part into <ClientOnly>.',
	'Alle Komponenten sind Standalone-Komponenten mit fink-*-Selektor, auch die von KoliBri.':
		"All components are standalone components with a fink-* selector, KoliBri's too.",
	'Props mit Objekten oder Großbuchstaben binden ([_on], [_hideLabel]="true"), Events in runden Klammern ((finkTaskSelect)).':
		'Bind props with objects or capital letters ([_on], [_hideLabel]="true"), events in round brackets ((finkTaskSelect)).',
	'Lauffähige Beispiele:': 'Runnable examples:',
	Weiter: 'Next',
	'Design anpassen: Tokens und Themes': 'Customise the design: tokens and themes',
	'Alle Komponenten': 'All components',
};
