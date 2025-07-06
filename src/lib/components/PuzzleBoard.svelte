<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import DropZone from './DropZone.svelte';
	import type { PuzzlePieceType } from '$lib/types';
	import PuzzleSvg from './PuzzleSVG.svelte';

	interface Props {
		pieces: (PuzzlePieceType | null)[];
		onDrop: (dropZoneId: number, pieceId: number) => void;
		gridSize: number;
	}

	let { pieces, onDrop, gridSize }: Props = $props();

	// Рассчитываем сторону квадратной сетки, чтобы вместить все элементы.
	// Math.ceil гарантирует, что сетка будет достаточно большой, даже если количество элементов не является идеальным квадратом.
	const gridSide = $derived(Math.ceil(Math.sqrt(gridSize)));

	// Создаем шаблон для колонок и строк, чтобы получить квадратную сетку
	const gridTemplate = $derived(`repeat(${gridSide}, minmax(0, 1fr))`);
	let svgEl: HTMLOrSVGElement;
	function handleClick() {
		console.log(svgEl);
	}
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


	<!-- <div class=" bg-puzzle-bg overflow-hidden rounded-2xl">
		<div
			class="grid gap-1"
			style:grid-template-columns={gridTemplate}
			style:grid-template-rows={gridTemplate}
		>
			{#each pieces as piece, index}
				<DropZone id={index} {onDrop}>
					{#snippet children()}
						{#if piece}
							<img
								src={piece.imageSrc}
								alt="Puzzle piece {piece.id}"
								class="w-full h-full object-cover rounded-md"
							/>
						{/if}
					{/snippet}
				</DropZone>
			{/each}
		</div>
	</div> -->