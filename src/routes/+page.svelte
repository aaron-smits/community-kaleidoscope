<script>
	import { onMount } from 'svelte'
	import { writable } from 'svelte/store'
	import Navbar from '$lib/components/Navbar.svelte'
	import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Button, Badge, TableSearch, Pagination } from 'flowbite-svelte'
	import { AnnotationSolid, ArrowLeftOutline, ArrowRightOutline, CalendarMonthSolid, DollarSolid, MapLocationOutline } from 'flowbite-svelte-icons'
	import { slide } from 'svelte/transition'

	/**
	 * @type {any}
	 */
	let LIMIT = 10

	let items = []
	let page = 1
	let pagination = {
		start: 1,
		end: LIMIT,
		total: null
	}

	async function fetchEvents(page) {
		const offset = page
		const params = new URLSearchParams({
			limit: LIMIT.toString(),
			offset: offset.toString()
		})
		let response = await fetch('api/events' + '?' + params.toString(), {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((res) => res.json())
		items = response.events
		pagination.total = response.total
		// the start is the total number of items from each page before out of the total
		// ie: if we are on page 2, the start is 11. If we are on page 3, the start is 21
		pagination.start = (page - 1) * LIMIT + 1
		// End will be the start + the number of items on the page, unless we are on the last page
		pagination.end = page * LIMIT > pagination.total ? pagination.total : page * LIMIT
	}

	onMount(() => fetchEvents(page))

	const prev = () => {
		if (page <= 1) return
		page--
		fetchEvents(page)
	}

	const next = () => {
		const totalPages = Math.ceil(pagination.total / LIMIT)
		if (page >= totalPages) return
		page++
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
	let searchTerm

	$: {
		if (searchTerm) {
			const term = searchTerm.toLowerCase()
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
						pagination.total = res.total
						pagination.end = res.total > 10 ? 10 : res.total
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
<body class="lg:m-10 bg-inherit	">
	<div id="table-head">
		<div class="pb-2 text-4xl font-bold text-center text-gray-900 bg-white dark:text-white dark:bg-gray-800">Events</div>
		<p class="m-2 text-sm font-normal text-center text-gray-700 dark:text-gray-200">
			Browse a list of upcoming events in our community. Click any row to see more details. Click any heading to sort.
		</p>
		<div class="flex justify-center align-center mx-auto">
			<TableSearch bind:inputValue={searchTerm} hoverable={true} placeholder="Search" />
		</div>
	</div>
	<div class="m-1 pt-2 pb-16">
		<div class="mx-auto text-sm text-gray-700 dark:text-gray-200 mb-1">
			Showing <span class="font-semibold text-gray-900 dark:text-white">{pagination.start}</span>
			to
			<span class="font-semibold text-gray-900 dark:text-white">{pagination.end}</span>
			of
			<span class="font-semibold text-gray-900 dark:text-white">{pagination.total}</span>
			Entries
		</div>
		<Table shadow={true}>
			<TableHead class="!whitespace-normal hidden md:table-header-group lg:table-header-group">
				<TableHeadCell class="!w-32 !whitespace-normal hidden md:table-cell  lg:table-cell" on:click={() => sortTable('date')}>Date</TableHeadCell>
				<TableHeadCell class="!whitespace-normal" on:click={() => sortTable('title')}>Title</TableHeadCell>
				<TableHeadCell class="!whitespace-normal hidden lg:table-cell" on:click={() => sortTable('location')}>Location</TableHeadCell>
			</TableHead>
			<TableBody>
				{#each filteredItems as item, i}
					<TableBodyRow class="!whitespace-normal" on:click={() => toggleRow(i)}>
						<TableBodyCell class="!w-32 !whitespace-normal hidden md:table-cell  lg:table-cell">{item.date}</TableBodyCell>
						<TableBodyCell class="!whitespace-normal">{item.title}</TableBodyCell>
						<TableBodyCell class="!whitespace-normal hidden lg:table-cell">{item.location}</TableBodyCell>
					</TableBodyRow>
					{#if openRow === i}
						<TableBodyRow on:click={() => (details = item)}>
							<TableBodyCell colspan="3" class="p-1 whitespace-pre-wrap" on:click={() => toggleRow(i)}>
								<div class="px-10 py-5" transition:slide={{ duration: 500, axis: 'y' }}>
									<div class="text-2xl leading-relaxed text-gray-700 dark:text-gray-200 whitespace-pre-wrap py-2">
										<div>{item.title}</div>
									</div>
									<div id="details container" class="flex flex-col justify-start">
										<div class="py-2 text-lg flex align-baseline leading-relaxed text-gray-700 dark:text-gray-200">
											<div class="pr-3"><CalendarMonthSolid /></div>
											<div>
												{new Date(item.date).toLocaleDateString('en-US', {
													year: 'numeric',
													month: 'long',
													day: 'numeric'
												})}
											</div>
										</div>
										<div class="py-2 text-lg flex align-baseline leading-relaxed text-gray-700 dark:text-gray-200">
											<div class="pr-3"><MapLocationOutline /></div>
											<div>{item.location}</div>
										</div>
										{#if item.cost}
											<div class="py-2 text-base flex align-middle leading-relaxed text-gray-700 dark:text-gray-200">
												<div class="pr-3 flex"><DollarSolid /></div>
												<div>{item.cost}</div>
											</div>
										{/if}
										<div class="py-2 text-lg flex align-baseline leading-relaxed text-gray-700 dark:text-gray-200">
											<div class="pr-3"><AnnotationSolid /></div>
											<Badge class="self-start" color="primary">{item.type}</Badge>
										</div>
										<div class="text-lg leading-relaxed text-gray-700 dark:text-gray-200 m-30 whitespace-pre-wrap py-2">
											{item ? item.desc : ''}
										</div>

										<div class="space-x-5 py-2">
											<Button color="purple">
												<a href={item ? item.source : ''} target="_blank">Source</a>
											</Button>
											{#if item.externalLink}
												<Button>
													<a href={item ? item.externalLink : ''} target="_blank">More Information</a>
												</Button>
											{/if}
										</div>
									</div>
								</div></TableBodyCell
							>
						</TableBodyRow>
					{/if}
				{/each}
			</TableBody>
		</Table>
	</div>
	<div class="flex flex-col items-center justify-center gap-2 pb-3 left-0 right-0 mx-auto fixed bottom-0">
		<Pagination class="text-white dark:text-gray-400">
			<div
				slot="prev"
				class="flex items-center gap-2"
				on:click={prev}
				on:keydown={(e) => {
					if (e.key === 'Enter') {
						prev()
					}
				}}
				role="button"
				tabindex="0"
			>
				<ArrowLeftOutline class="w-3.5 h-3.5 mr-2" />
				Prev
			</div>
			<div
				slot="next"
				class="flex items-center gap-2"
				on:click={next}
				on:keydown={(e) => {
					if (e.key === 'Enter') {
						next()
					}
				}}
				role="button"
				tabindex="0"
			>
				Next
				<ArrowRightOutline class="w-3.5 h-3.5 ml-2" />
			</div>
		</Pagination>
	</div>
</body>
