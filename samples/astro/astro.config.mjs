import { defineConfig } from 'astro/config';

// Für die Galerie der Website: Unterpfad aus SAMPLE_BASE.
export default defineConfig({ base: process.env.SAMPLE_BASE ?? '/' });
