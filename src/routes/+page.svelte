<script>
	import { onMount } from 'svelte'
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
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger
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

	$: filteredItems = items.filter((item) => {
		for (let key in item) {
			if (
				typeof item[key] === 'string' &&
				item[key].toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
			) {
				return true
			}
		}
		return false
	})
</script>

<Navbar>
	<NavBrand>
		<img src={logo} class="mr-3 h-6 sm:h-9" alt="CK Logo" />
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
			>Community Kaleidoscope</span
		>
	</NavBrand>
</Navbar>

<div class="m-20">
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
		</caption>
		<TableHead>
			<!-- <TableHeadCell /> -->
			<TableHeadCell>Date</TableHeadCell>
			<TableHeadCell>Title</TableHeadCell>
			<TableHeadCell>Type</TableHeadCell>
			<TableHeadCell>Location</TableHeadCell>
			<TableHeadCell>Cost</TableHeadCell>
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