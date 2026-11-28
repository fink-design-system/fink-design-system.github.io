import { useState } from 'react';

import { defineCustomElements, FinkAlert, FinkPageHeader, FinkTaskList, type FinkTask } from '@fink-ui/react';

// Die fink-*-Elemente und ihre Tag-Namen gibt es nur im Browser. Der Server rendert den Fallback,
// der Browser die Seite, nachdem defineCustomElements KoliBri und die eigenen Komponenten registriert hat.
export async function clientLoader() {
	await defineCustomElements();
	return null;
}
clientLoader.hydrate = true as const;

export function HydrateFallback() {
	return null;
}

const tasks: FinkTask[] = [
	{ id: 'angaben', label: 'Angaben machen', status: 'done' },
	{ id: 'nachweise', label: 'Nachweise hochladen', status: 'in-progress' },
	{ id: 'senden', label: 'Antrag senden', status: 'todo' },
];

export default function Home() {
	const [task, setTask] = useState<string>();

	return (
		<main>
			<FinkPageHeader _heading="Fink mit React Router" _description="Einstieg: app/routes/home.tsx" />
			<FinkTaskList _tasks={tasks} _showProgress onFinkTaskSelect={(event) => setTask(event.detail)} />
			{task && (
				<FinkAlert _label="React Router hat das Event finkTaskSelect empfangen" _type="info" _variant="card" _level={2}>
					{task}
				</FinkAlert>
			)}
		</main>
	);
}
