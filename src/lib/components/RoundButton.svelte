<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children, ...rest }: { flipY?: boolean; children: Snippet } = $props();
</script>

<button class="rnd-button" {...rest}>
	{@render children()}
</button>

<style>
	.rnd-button {
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 100%;
		aspect-ratio: 1/1;
		width: 63px;
		height: 63px;
		background: #f88c41;
		box-shadow:
			0px 4px 15px rgba(0, 0, 0, 0.15),
			inset 0px -4px 4px rgba(0, 0, 0, 0.3),
			inset 0px 4px 4px rgba(255, 255, 255, 0.35);
	}
</style>
