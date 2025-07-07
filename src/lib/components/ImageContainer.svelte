<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<div
	class="rounded-b-2xl shrink-0 overflow-hidden w-full px-2 pt-10 pb-2 gap-6 bg-secondary layer-shadow flex flex-col justify-center items-center"
>
	{@render children()}
</div>

<style>
	@layer components {
		.layer-shadow {
			box-shadow:
				-9px 7px 4.9px rgba(0, 0, 0, 0.05),
				inset -2px -3px 1.2px rgba(255, 255, 255, 0.25);
		}
	}
</style>
