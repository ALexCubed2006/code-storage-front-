/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			backgroundImage: {
				'blank-img': "url(src/assets/blank-img.png)",
			}
		},
		fontFamily: {
			'verdana': ['Verdana', 'Tahoma', 'sans-serif'],
		},
	},
	plugins: [],
}