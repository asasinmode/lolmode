import {
	defineConfig,
	presetIcons,
	presetWebFonts,
	presetWind3,
	transformerDirectives,
	transformerVariantGroup,
} from 'unocss';

export default defineConfig({
	presets: [
		presetWind3(),
		presetIcons(),
		presetWebFonts({
			provider: 'bunny',
			fonts: {
				sans: 'Atkinson Hyperlegible',
			},
		}),
	],
	transformers: [
		transformerVariantGroup(),
		transformerDirectives(),
	],
	safelist: ['font-sans'],
});
