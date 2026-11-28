import { useCallback, useRef } from 'react';

/**
 * Fokussiert nach einem fehlgeschlagenen Absenden die Fehlerzusammenfassung von FinkForm
 * (KoliBri-Checkliste; WCAG 3.3.1, 2.4.3). FinkForm tut das nicht selbst.
 */
export function useFormErrorFocus() {
	const ref = useRef<HTMLKolFormElement>(null);
	const focusErrors = useCallback(() => {
		void ref.current?.focusErrorList();
	}, []);
	return [ref, focusErrors] as const;
}
