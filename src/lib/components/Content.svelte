<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<div class="flex flex-col justify-between items-center h-dvh px-6 pb-[10%]">
	{@render children()}
</div>
