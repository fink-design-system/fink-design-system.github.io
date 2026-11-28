// Für die Galerie der Website (SAMPLE_BASE): statischer Export unter einem Unterpfad. Ohne die Variable läuft die App
// wie gewohnt mit Server-Rendering.
const base = process.env.SAMPLE_BASE?.replace(/\/$/, '');

/** @type {import('next').NextConfig} */
export default base ? { output: 'export', basePath: base, trailingSlash: true, images: { unoptimized: true } } : {};
