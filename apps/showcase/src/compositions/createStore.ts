import { useSyncExternalStore } from 'react';
import { language } from '../i18n';

/**
 * Kleiner Store außerhalb von React: übersteht Neumontagen (Theme-Wechsel) und hält den Stand
 * in sessionStorage. Nur für Demo-Daten gedacht.
 */
export function createStore<T>(key: string, initial: () => T) {
	const storageKey = `fink-composition:${key}:${language}`;
	let state: T;
	try {
		const raw = sessionStorage.getItem(storageKey);
		state = raw ? (JSON.parse(raw) as T) : initial();
	} catch {
		state = initial();
	}
	const listeners = new Set<() => void>();
	const set = (next: T | ((current: T) => T)) => {
		state = typeof next === 'function' ? (next as (current: T) => T)(state) : next;
		try {
			sessionStorage.setItem(storageKey, JSON.stringify(state));
		} catch {
			// sessionStorage nicht verfügbar
		}
		listeners.forEach((listener) => listener());
	};
	const subscribe = (listener: () => void) => {
		listeners.add(listener);
		return () => listeners.delete(listener);
	};
	const use = () => [useSyncExternalStore(subscribe, () => state), set] as const;
	return { use, set, get: () => state, reset: () => set(initial()) };
}
