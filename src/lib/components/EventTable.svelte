<script>
	import { Table, TableHead, TableHeadCell, TableBody, TableBodyRow, TableBodyCell, Spinner } from 'flowbite-svelte'
	import ExpandoRow from './Expando-Row.svelte'

	export let details = null
	
	/**
	 * @type {any[]}
	 */
	export let filteredItems = []
	/**
	 * @type {any}
	 */
	export let sortTable
	/**
	 * @type {any}
	 */
	export let toggleRow
	/**
	 * @type {any}
	 */
	export let openRow = null
</script>
{#if filteredItems.length === 0}
<div class="flex justify-center">
	<Spinner class="mx-auto" />
</div>
{/if}
<Table shadow={true} class="pb-10">
	<TableHead class="!whitespace-normal hidden md:table-header-group lg:table-header-group">
		<TableHeadCell class="w-32 !whitespace-normal hidden md:table-cell  lg:table-cell" on:click={() => sortTable('date')}>Date</TableHeadCell>
		<TableHeadCell class="!whitespace-normal" on:click={() => sortTable('title')}>Title</TableHeadCell>
		<TableHeadCell class="hidden lg:table-cell" on:click={() => sortTable('location')}>Location</TableHeadCell>
	</TableHead>
	<TableBody>
		{#each filteredItems as item, i}
			<TableBodyRow class="!whitespace-normal" on:click={() => toggleRow(i)}>
				<TableBodyCell class="!w-32 hidden md:table-cell  lg:table-cell">{item.date}</TableBodyCell>
				<TableBodyCell class="!whitespace-normal">{item.title}</TableBodyCell>
				<TableBodyCell class="hidden lg:table-cell">{item.location}</TableBodyCell>
			</TableBodyRow>
			{#if openRow === i}
				<ExpandoRow {details} {item} {i} {toggleRow} />
			{/if}
		{/each}
	</TableBody>
</Table>
