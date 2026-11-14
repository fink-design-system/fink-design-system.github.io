import { useEffect, useState } from 'react';

const read = () => (window.location.hash.replace(/^#/, '') || '/').split('?')[0];

/** Minimaler Hash-Router: liefert den aktuellen Pfad, z. B. „/components/fink-stepper“. */
export function useRoute(): string {
	const [route, setRoute] = useState(read);
	useEffect(() => {
		const update = () => setRoute(read());
		window.addEventListener('hashchange', update);
		return () => window.removeEventListener('hashchange', update);
	}, []);
	return route;
}

export const navigate = (path: string) => {
	window.location.hash = path;
};
