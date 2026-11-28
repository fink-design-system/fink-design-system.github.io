import { FinkCodeBlock, FinkLink, FinkPageHeader, type FinkCodeTab } from '@fink-ui/react';
import { t } from '../i18n';
import { REPO_URL } from '../site/GitHubLink';

const html: FinkCodeTab[] = [
	{ label: 'Terminal', language: 'bash', filename: 'Terminal', code: 'npm install @fink-ui/components' },
	{
		label: 'index.html',
		language: 'html',
		filename: 'index.html',
		code: `<!doctype html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="node_modules/@fink-ui/components/dist/fink/fink.css" />
    <!-- Registriert die eigenen Komponenten und KoliBri als fink-* mit dem Fink-Theme. -->
    <script type="module" src="node_modules/@fink-ui/components/dist/fink/fink.esm.js"></script>
  </head>
  <body>
    <fink-page-header _heading="Antrag"></fink-page-header>
    <fink-input-text id="name" _label="Name" _required></fink-input-text>
    <fink-button id="save" _label="Speichern" _variant="primary"></fink-button>

    <script type="module">
      // Props mit Objekten oder Funktionen als Property, Text-Props als Attribut.
      document.querySelector('#save')._on = {
        onClick: async () => alert(\`Gespeichert für \${await document.querySelector('#name').getValue()}\`),
      };
    </script>
  </body>
</html>`,
	},
	{
		label: 'Mit Bundler',
		language: 'ts',
		filename: 'main.ts',
		code: `import '@fink-ui/components/dist/collection/fink.css';
import { defineCustomElements } from '@fink-ui/components/dist/loader/index.js';

await defineCustomElements();

document.querySelector('fink-task-list')?.addEventListener('finkTaskSelect', (event) => {
  console.log((event as CustomEvent<string>).detail);
});`,
	},
];

const react: FinkCodeTab[] = [
	{ label: 'Terminal', language: 'bash', filename: 'Terminal', code: 'npm install @fink-ui/react' },
	{
		label: 'main.tsx',
		language: 'tsx',
		filename: 'main.tsx',
		code: `import '@fink-ui/react/fink.css';
import { createRoot } from 'react-dom/client';
import { defineCustomElements } from '@fink-ui/react';
import { App } from './App';

await defineCustomElements();
createRoot(document.getElementById('root')!).render(<App />);`,
	},
	{
		label: 'App.tsx',
		language: 'tsx',
		filename: 'App.tsx',
		code: `import { useState } from 'react';
import { FinkAlert, FinkButton, FinkInputText, FinkTaskList, type FinkTask } from '@fink-ui/react';

const tasks: FinkTask[] = [
  { id: 'angaben', label: 'Angaben machen', status: 'done' },
  { id: 'nachweise', label: 'Nachweise hochladen', status: 'todo' },
];

export function App() {
  const [name, setName] = useState('');
  const [task, setTask] = useState<string>();

  return (
    <main>
      <FinkInputText _label="Name" _value={name} _on={{ onInput: (_event, value) => setName(String(value ?? '')) }} />
      <FinkButton _label="Speichern" _variant="primary" _on={{ onClick: () => alert(\`Gespeichert für \${name}\`) }} />
      <FinkTaskList _tasks={tasks} onFinkTaskSelect={(event) => setTask(event.detail)} />
      {task && <FinkAlert _label={\`Gewählt: \${task}\`} _type="info" />}
    </main>
  );
}`,
	},
];

const vue: FinkCodeTab[] = [
	{ label: 'Terminal', language: 'bash', filename: 'Terminal', code: 'npm install @fink-ui/vue' },
	{
		label: 'main.ts',
		language: 'ts',
		filename: 'main.ts',
		code: `import '@fink-ui/vue/fink.css';
import { createApp } from 'vue';
import { defineCustomElements } from '@fink-ui/vue';
import App from './App.vue';

await defineCustomElements();
createApp(App).mount('#app');`,
	},
	{
		label: 'App.vue',
		language: 'html',
		filename: 'App.vue',
		code: `<script setup lang="ts">
import { ref } from 'vue';
import { FinkAlert, FinkButton, FinkTaskList, type FinkTask, type FinkTaskListCustomEvent } from '@fink-ui/vue';

const tasks: FinkTask[] = [
  { id: 'angaben', label: 'Angaben machen', status: 'done' },
  { id: 'nachweise', label: 'Nachweise hochladen', status: 'todo' },
];
const task = ref<string>();
const onSave = { onClick: () => alert('Gespeichert') };
const onSelect = (event: FinkTaskListCustomEvent<string>) => (task.value = event.detail);
</script>

<template>
  <main>
    <FinkButton _label="Speichern" _variant="primary" :_on="onSave" />
    <FinkTaskList :_tasks="tasks" @finkTaskSelect="onSelect" />
    <FinkAlert v-if="task" :_label="\`Gewählt: \${task}\`" _type="info" />
  </main>
</template>`,
	},
];

const angular: FinkCodeTab[] = [
	{ label: 'Terminal', language: 'bash', filename: 'Terminal', code: 'npm install @fink-ui/angular' },
	{
		label: 'angular.json',
		language: 'json',
		filename: 'angular.json',
		code: `"build": {
  "options": {
    "styles": ["node_modules/@fink-ui/angular/fink.css"]
  }
}`,
	},
	{
		label: 'main.ts',
		language: 'ts',
		filename: 'main.ts',
		code: `import { bootstrapApplication } from '@angular/platform-browser';
import { defineCustomElements } from '@fink-ui/angular';
import { App } from './app/app';

await defineCustomElements();
await bootstrapApplication(App);`,
	},
	{
		label: 'app.ts',
		language: 'ts',
		filename: 'app/app.ts',
		code: `import { Component, signal } from '@angular/core';
import { FinkAlert, FinkButton, FinkTaskList, type FinkTask, type FinkTaskListCustomEvent } from '@fink-ui/angular';

@Component({
  selector: 'app-root',
  imports: [FinkAlert, FinkButton, FinkTaskList],
  template: \`
    <main>
      <fink-button _label="Speichern" _variant="primary" [_on]="onSave"></fink-button>
      <fink-task-list [_tasks]="tasks" (finkTaskSelect)="onSelect($event)"></fink-task-list>
      @if (task(); as id) {
        <fink-alert [_label]="'Gewählt: ' + id" _type="info"></fink-alert>
      }
    </main>
  \`,
})
export class App {
  protected readonly tasks: FinkTask[] = [
    { id: 'angaben', label: 'Angaben machen', status: 'done' },
    { id: 'nachweise', label: 'Nachweise hochladen', status: 'todo' },
  ];
  protected readonly task = signal<string | null>(null);
  protected readonly onSave = { onClick: () => alert('Gespeichert') };

  protected onSelect(event: FinkTaskListCustomEvent<string>): void {
    this.task.set(event.detail);
  }
}`,
	},
];

interface Case {
	id: string;
	title: string;
	pkg: string;
	tabs: FinkCodeTab[];
	notes: string[];
	samples: Array<[string, string]>;
}

const cases: Case[] = [
	{
		id: 'html',
		title: 'HTML',
		pkg: '@fink-ui/components',
		tabs: html,
		notes: [
			t('Ohne Framework und ohne Bundler: Stylesheet und ESM-Build direkt einbinden, die Elemente heißen fink-*.'),
			t('Text-Props stehen als Attribut im Markup, Props mit Objekten oder Funktionen (z. B. _on) werden als Property gesetzt.'),
			t('Events der eigenen Komponenten sind DOM-Events in camelCase, z. B. finkTaskSelect.'),
		],
		samples: [
			['HTML', 'samples/html'],
			['Astro', 'samples/astro'],
		],
	},
	{
		id: 'react',
		title: 'React',
		pkg: '@fink-ui/react',
		tabs: react,
		notes: [
			t('Alle Komponenten heißen Fink*, die von KoliBri (FinkButton) wie die eigenen (FinkTaskList).'),
			t('Statt defineCustomElements() kann FinkProvider die App umschließen: Er registriert selbst und verwaltet Farbschema, Theme und Sprache.'),
			t('Server-Rendering (Next.js, React Router): den Fink-Teil erst im Client rendern, nachdem defineCustomElements() gelaufen ist.'),
		],
		samples: [
			['React', 'samples/react'],
			['Next.js', 'samples/nextjs'],
			['React Router', 'samples/react-router'],
		],
	},
	{
		id: 'vue',
		title: 'Vue',
		pkg: '@fink-ui/vue',
		tabs: vue,
		notes: [
			t('Props mit Objekten binden (:_on, :_tasks), Events in camelCase (@finkTaskSelect).'),
			t('Nuxt: Registrierung als Client-Plugin und den Fink-Teil in <ClientOnly>.'),
		],
		samples: [
			['Vue', 'samples/vue'],
			['Nuxt', 'samples/nuxt'],
		],
	},
	{
		id: 'angular',
		title: 'Angular',
		pkg: '@fink-ui/angular',
		tabs: angular,
		notes: [
			t('Alle Komponenten sind Standalone-Komponenten mit fink-*-Selektor, auch die von KoliBri.'),
			t('Props mit Objekten oder Großbuchstaben binden ([_on], [_hideLabel]="true"), Events in runden Klammern ((finkTaskSelect)).'),
		],
		samples: [['Angular', 'samples/angular']],
	},
];

/** Getting Started: Einbindung in HTML, React, Vue und Angular in jeweils vier Schritten. */
export function GettingStarted() {
	return (
		<>
			<FinkPageHeader
				_heading={t('Getting Started')}
				_description={t('Fink in fünf Minuten in eine Anwendung bringen – ohne Framework, mit React, Vue oder Angular.')}
			/>

			<section className="section" aria-labelledby="gs-pattern">
				<h2 id="gs-pattern">{t('Immer dasselbe Muster')}</h2>
				<ol className="prose">
					<li>{t('Ein Paket installieren. KoliBri, Theme und Tokens kommen als Abhängigkeiten mit.')}</li>
					<li>{t('Ein Stylesheet laden: fink.css (Icon-Fonts, Design Tokens, Seitenschrift).')}</li>
					<li>{t('Einmal beim Start registrieren: defineCustomElements().')}</li>
					<li>{t('Komponenten nutzen: Im DOM heißt alles fink-*, in React, Vue und Angular heißen alle Komponenten Fink*.')}</li>
				</ol>
				<p className="prose">
					{t(
						'Sprache und Theme liest die Bibliothek beim Registrieren von <html>: lang="de" oder lang="en", optional data-theme. Das Farbschema folgt color-scheme am Dokument.',
					)}
				</p>
			</section>

			{cases.map((entry) => (
				<section key={entry.id} className="section" aria-labelledby={`gs-${entry.id}`}>
					<h2 id={`gs-${entry.id}`}>
						{entry.title} <code>{entry.pkg}</code>
					</h2>
					<FinkCodeBlock _tabs={entry.tabs} />
					<ul className="prose">
						{entry.notes.map((note) => (
							<li key={note}>{note}</li>
						))}
					</ul>
					<p className="prose">
						{t('Lauffähige Beispiele:')}{' '}
						{entry.samples.map(([label, path], index) => (
							<span key={path}>
								{index > 0 && ', '}
								<FinkLink _href={`${REPO_URL}/tree/develop/${path}`} _label={label} _target="_blank" />
							</span>
						))}
					</p>
				</section>
			))}

			<section className="section" aria-labelledby="gs-next">
				<h2 id="gs-next">{t('Weiter')}</h2>
				<ul className="prose">
					<li>
						<FinkLink _href="#/theming" _label={t('Design anpassen: Tokens und Themes')} />
					</li>
					<li>
						<FinkLink _href="#/components" _label={t('Alle Komponenten')} />
					</li>
					<li>
						<FinkLink _href="#/patterns" _label={t('Patterns')} />
					</li>
				</ul>
			</section>
		</>
	);
}
