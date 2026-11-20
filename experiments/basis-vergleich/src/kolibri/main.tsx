/**
 * Variante KoliBri: die unveränderten Fink-Komponenten fink-tag-input und fink-file-upload.
 * Diese Datei ist nur Prüfstand. Der gezählte Aufwand sind die Fink-Quellen (siehe scripts/measure.mjs).
 */
import '@fink/tokens/tokens.css';
import '../shared/page.css';
import { createRoot } from 'react-dom/client';
import { FinkFileUpload, FinkProvider, FinkTagInput } from '@fink/react';
import { FILE, TAG, log } from '../shared/config';

function Page() {
	return (
		<main>
			<h1>Variante: KoliBri (Fink, wie gebaut)</h1>
			<section aria-labelledby="h-tag">
				<h2 id="h-tag">Tag-Eingabe</h2>
				<FinkTagInput
					_label={TAG.label}
					_placeholder={TAG.placeholder}
					_options={TAG.options}
					_value={TAG.value}
					_max={TAG.max}
					onFinkChange={(event) => log('tags', event.detail)}
				/>
			</section>
			<section aria-labelledby="h-file">
				<h2 id="h-file">Dateien hochladen</h2>
				<FinkFileUpload
					_label={FILE.label}
					_hint={FILE.hint}
					_accept={FILE.accept}
					_maxSize={FILE.maxSize}
					_multiple={FILE.multiple}
					onFinkFilesChange={(event) => log('files', event.detail.map((file) => file.name))}
				/>
			</section>
			<div id="event-log" aria-hidden="true"></div>
		</main>
	);
}

createRoot(document.getElementById('app')!).render(
	<FinkProvider defaultColorScheme="light" defaultLanguage="de" reloadOnLanguageChange={false}>
		<Page />
	</FinkProvider>,
);
