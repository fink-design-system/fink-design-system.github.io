import { Component, signal } from '@angular/core';
import { FinkAlert, FinkPageHeader, FinkTaskList, type FinkTask, type FinkTaskListCustomEvent } from '@fink-ui/angular';

@Component({
	selector: 'app-root',
	// Eigene Komponenten und KoliBri-Komponenten heißen auch in Angular Fink* und haben fink-*-Selektoren.
	imports: [FinkAlert, FinkPageHeader, FinkTaskList],
	templateUrl: './app.html',
})
export class App {
	protected readonly tasks: FinkTask[] = [
		{ id: 'angaben', label: 'Angaben machen', status: 'done' },
		{ id: 'nachweise', label: 'Nachweise hochladen', status: 'in-progress' },
		{ id: 'senden', label: 'Antrag senden', status: 'todo' },
	];
	protected readonly task = signal<string | null>(null);

	protected onSelect(event: FinkTaskListCustomEvent<string>): void {
		this.task.set(event.detail);
	}
}
