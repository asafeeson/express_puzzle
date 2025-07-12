<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children, className }: { children: Snippet; className?: String } = $props();
</script>

<span
	class="font-baloo font-black text-center text-sweet-orange text-shadow-[1px_2px_4.5px_rgba(0,0,0,0.25)] {className}"
>
	{@render children()}
</span>
