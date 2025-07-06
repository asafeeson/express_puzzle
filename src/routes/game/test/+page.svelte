<script lang="ts">
	import PuzzleSvg from '$lib/components/PuzzleSVG.svelte';
	import type { SvelteComponent } from 'svelte';
	import type { PageProps } from './$types';
	import TestPuzzle from '$lib/components/TestPuzzle.svelte';

	const { data }: PageProps = $props();
</script>

<div class="flex flex-col gap-4">
	<div class="relative rounded-md overflow-hidden">
		<PuzzleSvg id="puzzle" imageHref="/pzz-owl/cat-owl.png" class="absolute inset-0"></PuzzleSvg>
		<img src="/pzz-owl/cat-owl.png" class="aspect-square w-full h-full" alt="" />
	</div>
</div>
