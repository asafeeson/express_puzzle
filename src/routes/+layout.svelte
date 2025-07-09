<script lang="ts">
	import { page } from '$app/state';
	import PlayOnMobilePlug from '$lib/components/PlayOnMobilePlug.svelte';
	import { fade } from 'svelte/transition';
	import '../app.css';
	import { MediaQuery } from 'svelte/reactivity';
	const mobile = new MediaQuery('max-width: 480px');
	let { children } = $props();
</script>

{#if mobile.current}
	{#key page.url}
		<main
			transition:fade={{ delay: 250, duration: 300 }}
			class="max-w-md mx-auto w-full h-dvh flex flex-col justify-center items-center"
		>
			{@render children()}
		</main>
	{/key}
{:else}
	<!-- Play on mobile plug -->
	<PlayOnMobilePlug />
{/if}
