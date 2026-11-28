import { FinkButton } from '@fink-ui/react';
import { useState, type ReactNode } from 'react';
import { t } from '../i18n';
import { CodeBlock, type CodeVariants } from './CodeBlock';

interface DemoProps {
	title: string;
	children: ReactNode;
	code?: string | CodeVariants;
	plain?: boolean;
	/** Code direkt ausgeklappt zeigen. */
	codeOpen?: boolean;
}

/** Live-Beispiel mit umschaltbarem Quellcode in Tabs (React, Web Component …). */
export function Demo({ title, children, code, plain, codeOpen = false }: DemoProps) {
	const [showCode, setShowCode] = useState(codeOpen);
	return (
		<section className="demo" aria-label={t('Beispiel: {{title}}', { title })}>
			<div className="demo-head">
				<h2>{title}</h2>
				{code && (
					<FinkButton
						_label={showCode ? t('Code ausblenden') : t('Code anzeigen')}
						_icons="codicon codicon-code"
						_variant="tertiary"
						_ariaExpanded={showCode}
						_on={{ onClick: () => setShowCode((v) => !v) }}
					/>
				)}
			</div>
			<div className={plain ? 'demo-stage demo-stage--plain' : 'demo-stage'}>{children}</div>
			{code && showCode && (
				<div className="demo-code">
					<CodeBlock code={code} />
				</div>
			)}
		</section>
	);
}
