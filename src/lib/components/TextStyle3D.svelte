<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<span class="ddd-text w-full">
	{@render children()}
</span>

<span></span>

<style>
	.ddd-text {
		font-family: 'Baloo Cyrilic', sans-serif;
		font-size: 36px;
		font-weight: 900;
		line-height: 93%;
		text-align: center;
		color: #ff6f00;
		text-shadow: 1px 2px 4.5px rgba(0, 0, 0, 0.25);
	}
</style>
