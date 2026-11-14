import { useSyncExternalStore } from 'react';
import { seedApplications, today, type Application, type Status } from './data';
import { language } from '../../i18n';
import { t } from '../../i18n';

/*
 * Kleiner Store außerhalb von React, damit die Daten einen Theme-Wechsel (Neumontage durch den
 * FinkProvider) überstehen. Die Sitzung wird zusätzlich in sessionStorage gehalten.
 */
const KEY = `fink-composition-v1:${language}`;

const load = (): Application[] => {
	try {
		const raw = sessionStorage.getItem(KEY);
		if (raw) return JSON.parse(raw) as Application[];
	} catch {
		// sessionStorage nicht verfügbar
	}
	return seedApplications();
};

let state: Application[] = load();
const listeners = new Set<() => void>();

const set = (next: Application[]) => {
	state = next;
	try {
		sessionStorage.setItem(KEY, JSON.stringify(state));
	} catch {
		// sessionStorage nicht verfügbar
	}
	listeners.forEach((listener) => listener());
};

const subscribe = (listener: () => void) => {
	listeners.add(listener);
	return () => listeners.delete(listener);
};

export const useApplications = () => useSyncExternalStore(subscribe, () => state);

export const applicationsStore = {
	add(input: Omit<Application, 'id' | 'received' | 'status' | 'history'>): Application {
		const maxId = state.reduce((max, app) => Math.max(max, Number(app.id.slice(-4))), 0);
		const created: Application = {
			...input,
			id: `FD-2026-${String(maxId + 1).padStart(4, '0')}`,
			received: today(),
			status: 'neu',
			history: [{ date: today(), text: t('Antrag eingegangen (online)') }],
		};
		set([created, ...state]);
		return created;
	},
	setStatus(id: string, status: Status, note: string) {
		set(state.map((app) => (app.id === id ? { ...app, status, history: [...app.history, { date: today(), text: note }] } : app)));
	},
	reset() {
		set(seedApplications());
	},
};
