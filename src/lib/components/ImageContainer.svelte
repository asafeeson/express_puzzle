<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<div class="grid place-content-center rounded-b-4xl overflow-hidden px-2 pt-10 pb-2 gap-6 bg-secondary">
	{@render children()}
</div>
