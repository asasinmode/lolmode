import { fileURLToPath } from 'node:url';
import Unocss from 'unocss/vite';
import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: 'lolmode',
	lang: 'en-US',
	description: 'various league of legends related stuff',
	head: [
		['link', { rel: 'icon', href: '/favicon.ico' }],
		['link', { rel: 'icon', href: '/favicon_dark.ico', media: '(prefers-color-scheme: dark)' }],
		['link', { rel: 'mask-icon', href: '/cupcake.svg', color: '#000000' }],
	],
	base: '/lolmode/',

	themeConfig: {
		logo: '/logo.webp',
		nav: [
			{ text: 'home', link: '/' },
			{ text: 'champions', link: '/champions/senna-souls' },
		],

		socialLinks: [
			{ icon: 'github', link: 'https://github.com/asasinmode/lolmode' },
			{ icon: 'x', link: 'https://twitter.com/asasinmode' },
		],

		sidebar: [
			{
				text: 'champions',
				base: '/champions/',
				items: [
					{ text: 'senna souls', link: 'senna-souls' },
				],
			},
		],
	},

	vite: {
		plugins: [
			Unocss(fileURLToPath(new URL('./uno.config.ts', import.meta.url))),
		],
	},

	vue: {
		script: {
			defineModel: true,
		},
	},
});
