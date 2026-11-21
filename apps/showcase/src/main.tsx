import '@fink/tokens/tokens.css';
import './styles/site.css';
import { i18n, language, t } from './i18n';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { FinkProvider } from '@fink/react';
import { App } from './App';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<FinkProvider defaultColorScheme="light" defaultLanguage={language} onLanguageChange={(lng) => void i18n.changeLanguage(lng)} registerOptions={{ includeSystems: true }} fallback={<div className="boot">{t('Fink Design System wird geladen')}</div>}>
			<App />
		</FinkProvider>
	</StrictMode>,
);
