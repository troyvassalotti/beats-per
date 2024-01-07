/** @type {import('vite').UserConfig} */

import VitePluginCustomElementsManifest from 'vite-plugin-cem'
import { jsdocExamplePlugin } from 'cem-plugin-jsdoc-example'
import { customElementVsCodePlugin } from 'custom-element-vs-code-integration'
import { customElementJetBrainsPlugin } from 'custom-element-jet-brains-integration'

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
				customElementVsCodePlugin(ideIntegrations),
				customElementJetBrainsPlugin(ideIntegrations),
			],
		}),
	],
}
