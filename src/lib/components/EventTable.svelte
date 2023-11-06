<script>
	import { Table, TableHead, TableHeadCell, TableBody, TableBodyRow, TableBodyCell } from 'flowbite-svelte'
	import { AnnotationSolid, ArrowLeftOutline, ArrowRightOutline, CalendarMonthSolid, DollarSolid, MapLocationOutline } from 'flowbite-svelte-icons'
	import { slide } from 'svelte/transition'
	import { Badge, Button, Pagination, TableSearch } from 'flowbite-svelte'

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
