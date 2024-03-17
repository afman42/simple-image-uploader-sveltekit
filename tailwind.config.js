/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				inter: ['Inter', 'sans-serif']
			},
			animation: {
				progress: 'progress 1s infinite linear'
			},
			keyframes: {
				progress: {
					'0%': { transform: ' translateX(0) scaleX(0)' },
					'40%': { transform: 'translateX(0) scaleX(0.4)' },
					'60%': { transform: 'translateX(0) scaleX(0.6)' },
					'100%': { transform: 'translateX(100%) scaleX(0.5)' }
				}
			},
			transformOrigin: {
				'left-right': '0% 100%'
			}
		}
	},
	plugins: []
};
