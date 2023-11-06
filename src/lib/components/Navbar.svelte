<script>
    import { Navbar, NavBrand, DarkMode } from 'flowbite-svelte';
    import logo from '$lib/images/ck.png';
</script>

<Navbar class="sticky">
	<NavBrand>
		<img src={logo} class="mr-3 h-6 sm:h-9" alt="CK Logo" />
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
		>Community Kaleidoscope</span
		>
	</NavBrand>
	<DarkMode />
</Navbar>