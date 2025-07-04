<script lang="ts">
	import type { Snippet } from 'svelte';
	import ArrowRight from './ArrowRight.svelte';

	let { flipY = false }: { flipY?: boolean } = $props();
</script>

<button class="rnd-button">
	<ArrowRight class={`w-full h-full ${flipY ? 'rotate-180' : ''}`}></ArrowRight>
</button>

<style>
	.rnd-button {
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 100%;
		aspect-ratio: 1/1;
		/* width: 48px;
		height: 48px; */
		background: #f88c41;
		box-shadow:
			0px 4px 15px rgba(0, 0, 0, 0.15),
			inset 0px -4px 4px rgba(0, 0, 0, 0.3),
			inset 0px 4px 4px rgba(255, 255, 255, 0.35);
	}
</style>
