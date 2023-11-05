<script>
	import { onMount } from 'svelte'
	import { writable } from 'svelte/store'
	import logo from '$lib/images/ck.png'

	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Button,
		Badge,
		Modal,
		TableSearch,
		Navbar,
		NavBrand
	} from 'flowbite-svelte'
	/**
	 * @type {any[]}
	 */
	let items = []
	/**
	 * @type {string}
	 */
	let searchTerm = ''

	onMount(async () => {
		items = await fetch('/api/events', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((res) => res.json())
	})
	/**
	 * @type {boolean}
	 */
	let defaultModal = false
	/**
	 * @type {{ title: string; date: string; type: any; location: any; cost: any; desc: any; source: any; externalLink: any; } | null}
	 */
	let currentItem = null

	$: if (!defaultModal) {
		currentItem = null
	}


	const sortKey = writable('date')
	const sortDirection = writable(1)
	const sortItems = writable(items.slice())
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

	$: {
		const key = $sortKey;
		const direction = $sortDirection;
		const sorted = [...items].sort((a, b) => {
			const aVal = a[key];
			const bVal = b[key];
			return aVal < bVal ? -direction : aVal > bVal ? direction : 0;
		});
		sortItems.set(sorted);
	}

    $: filteredItems = $sortItems.filter((item) => {
        return Object.values(item).some(value =>
        	value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
    });
</script>

<Navbar>
	<NavBrand>
		<img src={logo} class="mr-3 h-6 sm:h-9" alt="CK Logo" />
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
			>Community Kaleidoscope</span
		>
	</NavBrand>
</Navbar>

<div class="m-5">
	<TableSearch bind:inputValue={searchTerm} hoverable={true} placeholder="Search by any field">
		<Table class="divide-y" striped={true} hoverable={true}>
			<caption
				class="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800"
			>
				Events
				<p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
					Browse a list of upcoming events in our community.
				</p>
				<p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
					Click any row to see more details.
				</p>
				<p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
					Click any heading to sort.
				</p>
			</caption>
			<TableHead>
				<!-- <TableHeadCell /> -->
				<TableHeadCell on:click={() => sortTable('date')}>Date</TableHeadCell>
				<TableHeadCell on:click={() => sortTable('title')}>Title</TableHeadCell>
				<TableHeadCell on:click={() => sortTable('type')}>Type</TableHeadCell>
				<TableHeadCell on:click={() => sortTable('location')}>Location</TableHeadCell>
				<TableHeadCell on:click={() => sortTable('cost')}>Cost</TableHeadCell>
			</TableHead>
			<TableBody>
				{#each filteredItems as item}
					<TableBodyRow on:click={() => ((defaultModal = true), (currentItem = item))}>
						<!-- <TableBodyCell>
						<Button size="sm" on:click={() => ((defaultModal = true), (currentItem = item))}
							>Details</Button
						>
					</TableBodyCell> -->
						<TableBodyCell>{item.date}</TableBodyCell>
						<TableBodyCell>{item.title}</TableBodyCell>
						<TableBodyCell>{item.type}</TableBodyCell>
						<TableBodyCell>{item.location}</TableBodyCell>
						<TableBodyCell>{item.cost}</TableBodyCell>
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
	</TableSearch>
	{#if currentItem}
		<Modal
			title={currentItem ? currentItem.title + ' - ' + currentItem.date : ''}
			bind:open={defaultModal}
			autoclose
			outsideclose
		>
			<Badge large color="indigo">{currentItem.type}</Badge>
			<p class="text-base font-bold leading-relaxed text-gray-500 dark:text-gray-400">
				{currentItem ? currentItem.location : ''}
			</p>
			<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
				{currentItem ? currentItem.cost : ''}
			</p>
			<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
				{currentItem ? currentItem.desc : ''}
			</p>
			<p class="text-base leading-relaxed text-blue-500 dark:text-blue-400">
				<a href={currentItem ? currentItem.source : ''} target="_blank">Source</a>
			</p>
			<p class="text-base leading-relaxed text-blue-500 dark:text-blue-400">
				<a href={currentItem ? currentItem.externalLink : ''} target="_blank">External Source</a>
			</p>
			<svelte:fragment slot="footer">
				<Button>Close</Button>
			</svelte:fragment>
		</Modal>
	{/if}
</div>
