import { useSyncExternalStore } from 'react';

/** Reagiert auf eine Media Query, z. B. für kompakte Bedienelemente auf schmalen Viewports. */
export function useMediaQuery(query: string): boolean {
	return useSyncExternalStore(
		(onChange) => {
			const list = window.matchMedia(query);
			list.addEventListener('change', onChange);
			return () => list.removeEventListener('change', onChange);
		},
		() => window.matchMedia(query).matches,
		() => false,
	);
}

/** Schmaler Viewport (Smartphone im Hochformat). */
export const useCompact = () => useMediaQuery('(max-width: 599px)');
