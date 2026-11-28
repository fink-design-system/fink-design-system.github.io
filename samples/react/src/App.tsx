import { useState } from 'react';

import { FinkAlert, FinkPageHeader, FinkTaskList, type FinkTask } from '@fink-ui/react';

const tasks: FinkTask[] = [
	{ id: 'angaben', label: 'Angaben machen', status: 'done' },
	{ id: 'nachweise', label: 'Nachweise hochladen', status: 'in-progress' },
	{ id: 'senden', label: 'Antrag senden', status: 'todo' },
];

export function App() {
	const [task, setTask] = useState<string>();

	return (
		<main>
			<FinkPageHeader _heading="Fink mit React" _description="Einstieg: src/App.tsx" />
			<FinkTaskList _tasks={tasks} _showProgress onFinkTaskSelect={(event) => setTask(event.detail)} />
			{task && (
				<FinkAlert _label="React hat das Event finkTaskSelect empfangen" _type="info" _variant="card" _level={2}>
					{task}
				</FinkAlert>
			)}
		</main>
	);
}
