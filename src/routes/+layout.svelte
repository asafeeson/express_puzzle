<script lang="ts">
	import { page } from '$app/state';
	import PageTransition from '$lib/components/PageTransition.svelte';
	import { fade } from 'svelte/transition';
	import '../app.css';
	let { children } = $props();
</script>

{#key page.url}
	<main transition:fade={{ delay: 250, duration: 300 }}>
		{@render children()}
	</main>
{/key}
