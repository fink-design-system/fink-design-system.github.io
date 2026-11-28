import '@fink-ui/react/fink.css';
import { i18n, language, t } from './i18n';
import './styles/site.css';

import { FinkProvider } from '@fink-ui/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { showcaseThemes } from './themes';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<FinkProvider
			themes={showcaseThemes}
			defaultColorScheme="light"
			defaultLanguage={language}
			onLanguageChange={(lng) => void i18n.changeLanguage(lng)}
			fallback={<div className="boot">{t('Fink Design System wird geladen')}</div>}
		>
			<App />
		</FinkProvider>
	</StrictMode>,
);
