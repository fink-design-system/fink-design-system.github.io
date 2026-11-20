import { FinkLogo } from '@fink/react';

/** Wortmarke des Fink Design Systems – Zeichen auf Kachelfläche in der Primärfarbe. */
export function Logo(props: { slot?: string }) {
	return <FinkLogo _variant="badge" _label="Fink Design System" slot={props.slot} />;
}
