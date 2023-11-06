import { createClient } from '@libsql/client'
import dotenv from 'dotenv'

dotenv.config()

const client = createClient({
	url: 'libsql://diverse-hawkwoman-aaron-smits.turso.io/',
	authToken: process.env.TURSO_TOKEN
})

export async function getAllEvents() {
	const query = 'SELECT * FROM events'
	const results = await client.execute(query)
	/**
	 * @type {import("@libsql/client").Row[]}
	 */
	let events = []
	results.rows.forEach((row) => {
		events.push(row)
	})
	return events
}
/**
 * @param {string} keyword
 * @param {number} page
 * @param {number} limit
 * @returns {Promise<{events: import("@libsql/client").Row[], total: number}>}
 */
export async function getEventsByKeyword(keyword, page, limit) {
	const offeset = (page - 1) * limit;
	console.log(`'${keyword}'`)
	const query = `
    SELECT * FROM events 
	WHERE LOWER(title) LIKE '%' || LOWER('${keyword}') || '%'
	ORDER BY date ASC
	LIMIT ${limit} OFFSET ${offeset}
	`
	const results = await client.execute(query)
	let response = {
		/**
		 * @type {import("@libsql/client").Row[]}
		 */
		events: [],
		total: 0,
	}
	results.rows.forEach((row) => {
		response.events.push(row)
	});
	response.total = response.events.length;
	return response;
}



/**
 * @param {number} page
 * @param {number} limit
 */
export async function getEventsPaginate(page, limit) {
    const offset = (page - 1) * limit;
    const query = `SELECT * FROM events ORDER BY date ASC LIMIT ${limit} OFFSET ${offset}`;
    const results = await client.execute(query);
    let response = {
		/**
		 * @type {import("@libsql/client").Row[]}
		 */
		events: [],
		total: 0,
	}
    results.rows.forEach((row) => {
        response.events.push(row)
    });
	const countQuery = 'SELECT COUNT(*) FROM events';
	const countResults = await client.execute(countQuery);
	response.total = Number(countResults.rows[0]['COUNT (*)']) || 0;
    return response;
}