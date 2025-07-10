<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children, className }: { children: Snippet; className?: string } = $props();
</script>

<div
	class="flex flex-col justify-between items-center h-dvh px-[8%] w-full pb-[10%] {className}"
	id="content-container"
>
	{@render children()}
</div>
