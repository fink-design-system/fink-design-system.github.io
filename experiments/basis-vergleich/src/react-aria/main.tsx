/** Prüfstand der Variante React Aria. Zählt nicht zum Aufwand. */
import '@fink/tokens/tokens.css';
import '../shared/page.css';
import './styles.css';
import { createRoot } from 'react-dom/client';
import { I18nProvider } from 'react-aria-components';
import { FILE, TAG, log } from '../shared/config';
import { FileUpload } from './FileUpload';
import { TagInput } from './TagInput';

createRoot(document.getElementById('app')!).render(
	<I18nProvider locale="de-DE">
		<main>
			<h1>Variante: React Aria</h1>
			<section aria-labelledby="h-tag">
				<h2 id="h-tag">Tag-Eingabe</h2>
				<TagInput label={TAG.label} placeholder={TAG.placeholder} options={TAG.options} value={TAG.value} max={TAG.max} onChange={(v) => log('tags', v)} />
			</section>
			<section aria-labelledby="h-file">
				<h2 id="h-file">Dateien hochladen</h2>
				<FileUpload
					label={FILE.label}
					hint={FILE.hint}
					accept={FILE.accept}
					maxSize={FILE.maxSize}
					multiple={FILE.multiple}
					onChange={(files) => log('files', files.map((file) => file.name))}
				/>
			</section>
			<div id="event-log" aria-hidden="true"></div>
		</main>
	</I18nProvider>,
);
