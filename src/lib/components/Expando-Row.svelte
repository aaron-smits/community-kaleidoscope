<script>
// @ts-nocheck

    import { Badge, Button, TableBodyRow, TableBodyCell } from 'flowbite-svelte';
    import { CalendarMonthSolid, MapLocationOutline, DollarSolid, AnnotationSolid } from 'flowbite-svelte-icons';
    import { slide } from 'svelte/transition';
    
    export let details = null;
    /**
	 * @type {{ title: any; date: string | number | Date; location: any; cost: any; type: any; desc: any; source: string | null | undefined; externalLink: string | null | undefined; } | null}
	 */
     export let item = null;
    /**
	 * @type {null}
	 */
     export let i = null;
    /**
	 * @type {((arg0: any) => void) | null}
	 */
     export let toggleRow = null;
    
</script>


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