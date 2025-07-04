<!-- PuzzlePiece.svelte -->
<script lang="ts">
	import type { PuzzlePieceType } from "$lib/types";


	interface Props {
		piece: PuzzlePieceType;
	}

	let { piece }: Props = $props();

	function handleDragStart(e: DragEvent) {
		if (e.dataTransfer && e.currentTarget instanceof HTMLElement) {
			e.dataTransfer.setData('pieceId', piece.id.toString());
			e.currentTarget.style.opacity = '0.5';
		}
	}

	function handleDragEnd(e: DragEvent) {
		if (e.currentTarget instanceof HTMLElement) {
			e.currentTarget.style.opacity = '1';
		}
	}
</script>

<div
	class="puzzle-piece"
	draggable="true"
	ondragstart={handleDragStart}
	ondragend={handleDragEnd}
	role="img"
	aria-label="Puzzle piece {piece.id}"
>
	<img src={piece.imageSrc} alt="Puzzle piece {piece.id}" />
</div>

<style>
	.puzzle-piece {
		cursor: grab;
		transition: opacity 0.2s ease;
	}

	.puzzle-piece:active {
		cursor: grabbing;
	}

	.puzzle-piece img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
</style>
