import { vitePreprocess } from '@sveltejs/kit/vite'
import adapter from '@sveltejs/adapter-vercel'
export default {
	kit: {
		adapter: adapter({})
	},

	preprocess: [vitePreprocess({})]
}
