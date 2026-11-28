'use client';

import dynamic from 'next/dynamic';

// The fink-* elements and their tag names exist in the browser only. The app therefore renders on the client,
// after defineCustomElements has registered KoliBri and the own components.
export const FinkApp = dynamic(
	async () => {
		const { defineCustomElements } = await import('@fink-ui/react');
		await defineCustomElements();
		return (await import('./app')).App;
	},
	{ ssr: false },
);
