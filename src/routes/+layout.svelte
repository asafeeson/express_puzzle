<script lang="ts">
	import { page } from '$app/state';
	import PageTransition from '$lib/components/PageTransition.svelte';
	import { fade } from 'svelte/transition';
	import '../app.css';
	let { children } = $props();
</script>

{#key page.url}
	<main transition:fade={{ delay: 250, duration: 300 }} class="max-w-md mx-auto w-full h-dvh flex flex-col justify-center items-center">
		{@render children()}
	</main>
{/key}
