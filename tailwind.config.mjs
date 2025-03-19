/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
	safelist: [
		'font-anime_font', 
	],
	theme: {
		extend: {
			fontFamily: {
				anime_font: ['Anime Kids - Personal Use', 'san-serif'],
			},
		},
	},
	plugins: [],
};
