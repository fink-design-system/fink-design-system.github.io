// Reine DOM-API: Text-Props sind Attribute in index.html, Events sind DOM-Events des Elements.
document.querySelector('fink-task-list').addEventListener('finkTaskSelect', (event) => {
	const alert = document.createElement('fink-alert');
	alert._label = 'HTML hat das Event finkTaskSelect empfangen';
	alert._type = 'info';
	alert._variant = 'card';
	alert._level = 2;
	alert.textContent = event.detail;
	document.querySelector('main').append(alert);
});
