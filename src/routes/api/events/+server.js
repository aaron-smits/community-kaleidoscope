import { getAllEvents, getEventsPaginate } from '$lib/server/server'

/** @type {import('./$types').RequestHandler} */
export async function GET({url}) {
    let page = Number(url.searchParams.get('offset')) ?? 0;
    let limit = Number(url.searchParams.get('limit')) ?? 50;
	return new Response(JSON.stringify(await getEventsPaginate(page, limit)), {
		headers: {
			'content-type': 'application/json'
		}
	});
}
