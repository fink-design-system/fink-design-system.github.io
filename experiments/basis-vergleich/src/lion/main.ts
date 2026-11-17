/** Prüfstand der Variante Lion. Zählt nicht zum Aufwand. */
import '@fink/tokens/tokens.css';
import '../shared/page.css';
import './styles.css';
import { html, render } from 'lit';
import { FILE, TAG, log } from '../shared/config';
import './tag-input';
import './file-upload';

render(
	html`<main>
		<h1>Variante: Lion</h1>
		<section aria-labelledby="h-tag">
			<h2 id="h-tag">Tag-Eingabe</h2>
			<fink-lion-tag-input
				.label=${TAG.label}
				.placeholder=${TAG.placeholder}
				.options=${TAG.options}
				.values=${TAG.value}
				.max=${TAG.max}
				@fink-change=${(event: CustomEvent<string[]>) => log('tags', event.detail)}
			></fink-lion-tag-input>
		</section>
		<section aria-labelledby="h-file">
			<h2 id="h-file">Dateien hochladen</h2>
			<fink-lion-file-upload
				label=${FILE.label}
				help-text=${FILE.hint}
				accept=${FILE.accept}
				max-file-size=${FILE.maxSize}
				?multiple=${FILE.multiple}
				@fink-files-change=${(event: CustomEvent<File[]>) => log('files', event.detail.map((file) => file.name))}
			></fink-lion-file-upload>
		</section>
		<div id="event-log" aria-hidden="true"></div>
	</main>`,
	document.getElementById('app')!,
);
