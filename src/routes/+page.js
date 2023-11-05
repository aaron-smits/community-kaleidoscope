/** @type {import('./$types').PageLoad} */
export async function load({ fetch, url }) {
    const resp = await fetch(
        `/api/events?page=${url.searchParams.get('page')}&itemsPerPage=${url.searchParams.get('itemsPerPage')}`
    )
    if (resp.ok) {
        return { props: { events: await resp.json() } };
    } else {
        return { status: resp.status, error: new Error(`Could not load events`)};
    }
}