<script>
    import {TableSearch}from 'flowbite-svelte';
    
    export let searchTerm = '';
</script>

<div id="table-caption" class="py-1 mx-1 text-gray-900 bg-white dark:text-white dark:bg-gray-800">
    <div class="py-1 text-4xl font-bold">Events</div>
    <div class="py-1 text-sm font-normal">
        Browse a list of upcoming events in our community. Click any row to see more details. Click any heading to sort.
    </div>
    <div class="flex justify-center mx-auto py-">
        <TableSearch bind:inputValue={searchTerm} hoverable={true} placeholder="Search" />
    </div>
</div>