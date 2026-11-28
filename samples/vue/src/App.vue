<script setup lang="ts">
import { FinkAlert, FinkPageHeader, FinkTaskList, type FinkTask, type FinkTaskListCustomEvent } from '@fink-ui/vue';
import { ref } from 'vue';

const tasks: FinkTask[] = [
	{ id: 'angaben', label: 'Angaben machen', status: 'done' },
	{ id: 'nachweise', label: 'Nachweise hochladen', status: 'in-progress' },
	{ id: 'senden', label: 'Antrag senden', status: 'todo' },
];
const task = ref<string>();

const onSelect = (event: FinkTaskListCustomEvent<string>) => {
	task.value = event.detail;
};
</script>

<template>
	<main>
		<FinkPageHeader _heading="Fink mit Vue" _description="Einstieg: src/App.vue" />
		<FinkTaskList :_tasks="tasks" :_show-progress="true" @finkTaskSelect="onSelect" />
		<FinkAlert v-if="task" _label="Vue hat das Event finkTaskSelect empfangen" _type="info" _variant="card" :_level="2">{{ task }}</FinkAlert>
	</main>
</template>
