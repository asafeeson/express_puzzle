<script lang="ts">
	import type { Snippet } from 'svelte';
	import { fly } from 'svelte/transition';
	const pageTransitionDuration = 500;

	let { children, url }: { children: Snippet; url: string } = $props();
</script>

{#key url}
	<div
		in:fly={{ x: -5, duration: pageTransitionDuration, delay: pageTransitionDuration }}
		out:fly={{ x: 5, duration: pageTransitionDuration }}
	>
		{@render children()}
	</div>
{/key}

<style>
</style>
