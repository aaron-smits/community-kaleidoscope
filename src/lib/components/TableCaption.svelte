<script>
    import {TableSearch}from 'flowbite-svelte';
    
    export let searchTerm = '';
</script>

<div id="table-caption">
    <div class="pb-2 text-4xl font-bold text-center text-gray-900 bg-white dark:text-white dark:bg-gray-800">Events</div>
    <p class="m-2 text-sm font-normal text-center text-gray-700 dark:text-gray-200">
        Browse a list of upcoming events in our community. Click any row to see more details. Click any heading to sort.
    </p>
    <div class="flex justify-center align-center mx-auto">
        <TableSearch bind:inputValue={searchTerm} hoverable={true} placeholder="Search" />
    </div>
</div>