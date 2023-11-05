import { getAllEvents } from '$lib/server/server'

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	return new Response(JSON.stringify(await getAllEvents()), {
		headers: {
			'content-type': 'application/json'
		}
	})
}
