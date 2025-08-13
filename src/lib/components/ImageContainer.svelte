<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children, className }: { children: Snippet, className?: string } = $props();
</script>

<div
	class="rounded-b-2xl shrink-0 overflow-hidden w-full px-2 pt-10 pb-10 gap-6 bg-secondary layer-shadow flex flex-col justify-center items-center {className}"
>
	{@render children()}
</div>
