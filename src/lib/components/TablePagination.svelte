<script>
    import { createEventDispatcher } from 'svelte';
    import { Pagination, } from 'flowbite-svelte'
    import { ArrowLeftOutline, ArrowRightOutline } from 'flowbite-svelte-icons'
    
    const dispatch = createEventDispatcher();

    export let page = 1;
    export let start = 0;
    export let end = 0;
    export let limit = 10
    export let total = 0
    function prev() {
        if (page > 1) {
            page--;
            dispatch('pageChange', page);
        }
    }

    function next() {
        let totalPages = Math.ceil(total / limit);
        if (page < totalPages) {
            page++;
            dispatch('pageChange', page);
        }
    }
</script>    

<div class="flex flex-col items-center justify-center gap-2 pb-3 left-0 right-0 mx-auto fixed bottom-0">
    <div class="mx-auto text-xs opacity-75 text-gray-700 dark:text-gray-200 mb-1">
        Showing <span class="font-semibold text-gray-900 dark:text-white">{start}</span>
        to
        <span class="font-semibold text-gray-900 dark:text-white">{end}</span>
        of
        <span class="font-semibold text-gray-900 dark:text-white">{total}</span>
        Entries
    </div>
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