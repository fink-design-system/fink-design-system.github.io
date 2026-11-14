import { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target';

export const config: Config = {
	namespace: 'fink',
	sourceMap: false,
	outputTargets: [
		{ type: 'dist', esmLoaderPath: '../loader' },
		{ type: 'dist-custom-elements', customElementsExportBehavior: 'single-export-module', externalRuntime: false },
		{ type: 'docs-json', file: 'dist/docs.json' },
		{ type: 'docs-vscode', file: 'dist/vscode-data.json' },
		reactOutputTarget({ outDir: '../react/src/generated' }),
	],
};
