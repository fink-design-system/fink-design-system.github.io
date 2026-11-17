/**
 * Messseite ohne Badge: nur fink-file-upload. Zeigt, was eine KoliBri-Seite lädt, auf der kein kol-badge vorkommt.
 * Prüfstand, zählt nicht zum Aufwand.
 */
import '@fink/tokens/tokens.css';
import '../shared/page.css';
import { createRoot } from 'react-dom/client';
import { FinkFileUpload, FinkProvider } from '@fink/react';
import { FILE } from '../shared/config';

createRoot(document.getElementById('app')!).render(
	<FinkProvider defaultColorScheme="light" defaultLanguage="de" reloadOnLanguageChange={false}>
		<main>
			<h1>Variante: KoliBri, Seite ohne Badge</h1>
			<section aria-labelledby="h-file">
				<h2 id="h-file">Dateien hochladen</h2>
				<FinkFileUpload _label={FILE.label} _hint={FILE.hint} _accept={FILE.accept} _maxSize={FILE.maxSize} _multiple={FILE.multiple} />
			</section>
		</main>
	</FinkProvider>,
);
