import { useCallback, useRef } from 'react';

/**
 * Fokussiert nach einem fehlgeschlagenen Absenden die Fehlerzusammenfassung von KolForm
 * (KoliBri-Checkliste; WCAG 3.3.1, 2.4.3). Ab KoliBri 4.6 geschieht das nicht mehr automatisch.
 */
export function useFormErrorFocus() {
	const ref = useRef<HTMLKolFormElement>(null);
	const focusErrors = useCallback(() => {
		void ref.current?.focusErrorList();
	}, []);
	return [ref, focusErrors] as const;
}
