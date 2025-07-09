<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<div class="flex flex-col justify-between items-center h-dvh px-[8%] w-full pb-[10%]" id="content-container">
	{@render children()}
</div>
