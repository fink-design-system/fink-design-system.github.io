<script setup lang="ts">
import { FinkAlert, FinkPageHeader, FinkTaskList, type FinkTask, type FinkTaskListCustomEvent } from '@fink-ui/vue';

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
	<!-- Die fink-*-Elemente und ihre Tag-Namen gibt es nur im Browser, deshalb rendert dieser Teil im Client. -->
	<ClientOnly>
		<main>
			<FinkPageHeader _heading="Fink mit Nuxt" _description="Einstieg: app/app.vue" />
			<FinkTaskList :_tasks="tasks" :_show-progress="true" @finkTaskSelect="onSelect" />
			<FinkAlert v-if="task" _label="Nuxt hat das Event finkTaskSelect empfangen" _type="info" _variant="card" :_level="2">{{ task }}</FinkAlert>
		</main>
	</ClientOnly>
</template>
