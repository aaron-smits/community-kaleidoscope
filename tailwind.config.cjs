const config = {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],

	plugins: [require('flowbite/plugin')],

	darkMode: 'class',

	theme: {
		extend: {
			colors: {
				// flowbite-svelte
				primary: {
					50: '#EBF8FF',
					100: '#D1EEFC',
					200: '#A7D8F0',
					300: '#7CC1E4',
					400: '#55AAD4',
					500: '#3994C1',
					600: '#2D83AE',
					700: '#1D6F98',
					800: '#166382',
					900: '#0B4F71'
				}
			}
		}
	}
}

module.exports = config
