/** @type {import('vite').UserConfig} */

import VitePluginCustomElementsManifest from 'vite-plugin-cem'
import { jsdocExamplePlugin } from 'cem-plugin-jsdoc-example'
import { generateCustomData } from 'cem-plugin-vs-code-custom-data-generator'
import { generateWebTypes } from 'cem-plugin-jet-brains-ide-integration'

const ideIntegrations = {
	outdir: 'dist',
}

export default {
	build: {
		lib: {
			entry: 'src/index',
			formats: ['es'],
		},
		rollupOptions: {
			external: ['lit'],
		},
	},
	plugins: [
		VitePluginCustomElementsManifest({
			files: ['./src/index.ts'],
			lit: true,
			plugins: [
				jsdocExamplePlugin(),
				generateCustomData(ideIntegrations),
				generateWebTypes(ideIntegrations),
			],
		}),
	],
}
