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
	// push each row in the results object to the events array
	results.rows.forEach((row) => {
		events.push(row)
	})
	return events
}
