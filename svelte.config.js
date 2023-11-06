import { vitePreprocess } from '@sveltejs/kit/vite'
import adapter from '@sveltejs/adapter-vercel'
export default {
	kit: {
		adapter: adapter({}),
		csp: {
			directives: {
				"script-src": ["self"],
				"connect-src": ["self", "vitals.vercel-insights.com"],
			}
		}
	},

	preprocess: [vitePreprocess({})]
}
