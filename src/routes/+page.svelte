<script>
	import { onMount } from 'svelte'
	import { writable } from 'svelte/store'
	import Navbar from '$lib/components/Navbar.svelte'
	import TableCaption from '$lib/components/TableCaption.svelte'
	import EventTable from '$lib/components/EventTable.svelte'
	import TablePagination from '$lib/components/TablePagination.svelte'

	let page = 1
	let items = []
	let total = 0
	let limit = 10
	let start = 0
	let end = 0
	/**
	 * @param {number} page
	 */
	async function fetchEvents(page) {
		const offset = page
		const params = new URLSearchParams({
			limit: limit.toString(),
			offset: offset.toString()
		})
		let response = await fetch('api/events' + '?' + params.toString(), {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((res) => res.json())
		items = response.events
		total = response.total
		// the start is the total number of items from each page before out of the total
		// ie: if we are on page 2, the start is 11. If we are on page 3, the start is 21
		start = (page - 1) * limit + 1
		// End will be the start + the number of items on the page, unless we are on the last page
		end = page * limit > total ? total : page * limit
	}

	onMount(() => fetchEvents(page))
	function handlePageChange(event) {
		let newPage = event.detail
		const totalPages = Math.ceil(total / limit)
		if (newPage > totalPages) {
			newPage = totalPages
		}
		if (newPage < 1) {
			newPage = 1
		}
		page = newPage
		fetchEvents(page)
	}
	const sortKey = writable('date')
	const sortDirection = writable(1)
	/**
	 * @param {any} key
	 */
	const sortTable = (key) => {
		if ($sortKey === key) {
			sortDirection.update((val) => -val)
		} else {
			sortKey.set(key)
			sortDirection.set(1)
		}
	}
	// ****************** Search ******************
	/**
	 * @type {any[]}
	 */
	let filteredItems = []
	/**
	 * @type {string}
	 */
	let search

	$: {
		if (search) {
			const term = search.toLowerCase()
			const params = new URLSearchParams({
				limit: '10',
				offset: (page - 1).toString(),
				keyword: term
			})

			;(async () =>
				fetch('api/events/search?' + params.toString(), {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json'
					}
				})
					.then((res) => res.json())
					.then((res) => {
						filteredItems = res.events
						total = res.total
						end = res.total > 10 ? 10 : res.total
					}))()
		} else {
			filteredItems = items
		}
	}
	// ****************** Sort ******************
	$: {
		const key = $sortKey
		const direction = $sortDirection
		filteredItems = [...filteredItems].sort((a, b) => {
			const aVal = a[key]
			const bVal = b[key]
			return aVal < bVal ? -direction : aVal > bVal ? direction : 0
		})
	}
	//****************** Expando row ******************
	/**
	 * @type {number | null}
	 */
	let openRow
	/**
	 * @type {any}
	 */
	let details
	// @ts-ignore
	const toggleRow = (i) => {
		openRow = openRow === i ? null : i
	}
</script>

<Navbar />
<TableCaption bind:searchTerm={search} />
<EventTable {details} {filteredItems} {sortTable} {toggleRow} {openRow} />
<TablePagination on:pageChange={handlePageChange} {page} {start} {end} {limit} {total} />
```
