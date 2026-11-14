import { Component, State, Event, EventEmitter, Prop, h } from '@stencil/core';
import { parseList } from '../../utils/shared';
import { getFinkLanguage, onFinkLanguageChange, t } from '../../i18n';

export type FinkTaskStatus = 'done' | 'in-progress' | 'todo' | 'blocked' | 'error';

export interface FinkTask {
	id: string;
	label: string;
	status: FinkTaskStatus;
	hint?: string;
	href?: string;
}

const STATUS: Record<FinkTaskStatus, { key: string; tone: 'success' | 'info' | 'brand' | 'neutral' | 'danger' }> = {
	done: { key: 'taskList.done', tone: 'success' },
	'in-progress': { key: 'taskList.inProgress', tone: 'info' },
	todo: { key: 'taskList.todo', tone: 'brand' },
	blocked: { key: 'taskList.blocked', tone: 'neutral' },
	error: { key: 'taskList.error', tone: 'danger' },
};

/**
 * Aufgabenliste für Vorgänge mit mehreren Teilaufgaben (GOV.UK „Complete multiple tasks“).
 * Zeigt den Fortschritt und den Status jeder Aufgabe; gesperrte Aufgaben sind nicht anwählbar.
 * Aufgaben sind kol-link bzw. kol-button-link, der Status ist fink-status (kol-badge).
 */
@Component({
	tag: 'fink-task-list',
	styleUrl: 'task-list.css',
	shadow: true,
})
export class FinkTaskList {

	/** Aktuelle Sprache; Änderung löst ein neues Rendern aus. */
	@State() locale = getFinkLanguage();

	private unsubscribeLanguage?: () => void;

	connectedCallback() {
		this.unsubscribeLanguage = onFinkLanguageChange((lng) => (this.locale = lng));
	}

	disconnectedCallback() {
		this.unsubscribeLanguage?.();
	}
	/** Aufgaben als Array oder JSON-String. */
	@Prop() _tasks!: FinkTask[] | string;

	/** Zeigt „x von y Aufgaben erledigt“ über der Liste. */
	@Prop() _showProgress?: boolean = true;

	/** Wird bei Auswahl einer Aufgabe ohne href ausgelöst; liefert deren id. */
	@Event() finkTaskSelect!: EventEmitter<string>;

	render() {
		const tasks = parseList<FinkTask>(this._tasks);
		const done = tasks.filter((task) => task.status === 'done').length;
		return (
			<div class="task-list">
				{this._showProgress && (
					<div class="progress">
						<p>{t('taskList.progress', { done, total: tasks.length })}</p>
						<span class="bar" aria-hidden="true">
							<span class="bar-fill" style={{ width: `${tasks.length ? (done / tasks.length) * 100 : 0}%` }}></span>
						</span>
					</div>
				)}
				<ul class="tasks">
					{tasks.map((task) => {
						const status = STATUS[task.status] ?? STATUS.todo;
						const blocked = task.status === 'blocked';
						return (
							<li class={{ task: true, 'task--blocked': blocked }}>
								<span class="text">
									{blocked ? (
										<span class="label">{task.label}</span>
									) : task.href ? (
										<kol-link _href={task.href} _label={task.label}></kol-link>
									) : (
										<kol-button-link _label={task.label} _on={{ onClick: () => this.finkTaskSelect.emit(task.id) }}></kol-button-link>
									)}
									{task.hint && <span class="hint">{task.hint}</span>}
								</span>
								<fink-status _label={t(status.key)} _tone={status.tone}></fink-status>
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
}
