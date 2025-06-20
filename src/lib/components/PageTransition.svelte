<script lang="ts">
	import type { Snippet } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	const pageTransitionDuration = 500;

	let { children, url }: { children: Snippet; url: any } = $props();
</script>

{#key url}
	<div
        transition:fade="{{delay: 250, duration: 300}}"
	>
		{@render children()}
	</div>
{/key}

<style>
</style>
