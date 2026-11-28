import type { Config } from '@react-router/dev/config';

// Für die Galerie der Website (SAMPLE_BASE): vorab gerenderte Startseite unter einem Unterpfad statt Server-Rendering.
const base = process.env.SAMPLE_BASE;

export default {
	ssr: !base,
	...(base ? { basename: base, prerender: ['/'] } : {}),
} satisfies Config;
