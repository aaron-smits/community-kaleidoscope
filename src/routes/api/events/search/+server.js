import { getEventsByKeyword } from '$lib/server/server'

/** @type {import('./$types').RequestHandler} */
export async function GET({url}) {
    let keyword = url.searchParams.get('keyword') ?? '';
    let page = Number(url.searchParams.get('offset')) ?? 0;
    let limit = Number(url.searchParams.get('limit')) ?? 10;
    return new Response(JSON.stringify(await getEventsByKeyword(keyword, page, limit)), {
        headers: {
            'content-type': 'application/json'
        }
    });
}