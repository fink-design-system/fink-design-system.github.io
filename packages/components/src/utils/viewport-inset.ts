/**
 * Hält fest angeheftete Flächen (Kopfzeile, Einwilligungsbanner) aus dem Weg fokussierter Elemente.
 *
 * WCAG 2.4.11 (Fokus nicht verdeckt): Elemente, die per Tastatur den Fokus erhalten, dürfen nicht vollständig
 * unter sticky oder fixed positionierten Inhalten liegen. Jede Quelle meldet ihre Höhe an einer Kante; das Dokument
 * bekommt daraus `scroll-padding` (Browser scrollen fokussierte Elemente daran vorbei) und unten zusätzlich
 * Innenabstand am body, damit auch das Seitenende über das Banner gescrollt werden kann.
 */
type Edge = 'top' | 'bottom';

const insets: Record<Edge, Map<object, number>> = { top: new Map(), bottom: new Map() };

const apply = () => {
	if (typeof document === 'undefined') return;
	const sum = (edge: Edge) => [...insets[edge].values()].reduce((a, b) => a + b, 0);
	const root = document.documentElement;
	const top = sum('top');
	const bottom = sum('bottom');
	root.style.scrollPaddingTop = top ? `${top}px` : '';
	root.style.scrollPaddingBottom = bottom ? `${bottom}px` : '';
	root.style.setProperty('--fink-viewport-inset-bottom', `${bottom}px`);
	if (document.body) document.body.style.paddingBottom = bottom ? `${bottom}px` : '';
};

/** Meldet die Höhe einer angehefteten Fläche an (0 oder undefined meldet ab). */
export const setViewportInset = (owner: object, edge: Edge, px?: number) => {
	if (px && px > 0) insets[edge].set(owner, Math.ceil(px));
	else insets[edge].delete(owner);
	apply();
};
