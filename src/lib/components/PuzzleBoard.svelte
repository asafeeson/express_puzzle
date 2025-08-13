<script lang="ts">
	import PuzzleSvg from './PuzzleSVG.svelte';
</script>

<div class="relative w-full my-4 p-2 h-fit">
	<PuzzleSvg id="puzzle" imageHref="/pzz-owl/cat-owl.png" class="absolute inset-0 w-full h-full"
	></PuzzleSvg>
	<img
		src="/pzz-owl/cat-owl.png"
		class="aspect-square w-full h-full"
		alt=""
		width="200"
		height="200"
	/>
</div>
