<!-- PieceTray.svelte -->
<script lang="ts">
	import PuzzlePiece from './PuzzlePiece.svelte';
	import type { PuzzlePieceType } from '$lib/types';
	import RoundButton from './RoundButton.svelte';
	import ArrowLeft from './ArrowLeft.svelte';

	interface Props {
		pieces: PuzzlePieceType[];
	}

	let { pieces }: Props = $props();
	const puzzleElements: PuzzlePieceType[] = [
		{ id: 1, imageSrc: '/pzz-owl/1.png' },
		{ id: 2, imageSrc: '/pzz-owl/2.png' },
		{ id: 3, imageSrc: '/pzz-owl/3.png' },
		{ id: 4, imageSrc: '/pzz-owl/4.png' }
	];
	let activePuzzleElement = $state<number>(0);
	let selectedPuzzleElement = $derived<string>(puzzleElements[activePuzzleElement].imageSrc);
	let buttonElement = $state<HTMLButtonElement>();
</script>

<div class="flex justify-between items-center w-full h-28">
	<RoundButton onClick={() => getPrevPuzzle(activePuzzleElement)}><ArrowLeft /></RoundButton>
	<div class="flex justify-center items-center w-full grow">
		{#key activePuzzleElement}
			<button
				bind:this={buttonElement}
				class="draggable-button"
				class:dragging={isDragging}
				onmousedown={handlePointerDown}
				ontouchstart={handlePointerDown}
				onclick={handleButtonClick}
			>
				<img
					src={selectedPuzzleElement}
					alt=""
					class="drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)] h-[106px]"
					transition:slide={{ delay: 250, duration: 300, easing: quintOut }}
				/>
			</button>
		{/key}
	</div>
	<RoundButton onClick={() => getNextPuzzle(activePuzzleElement)}><ArrowRight /></RoundButton>
</div>

<button class="reset-button" onclick={resetPosition}>Сбросить позицию</button>
<div class="piece-tray-container">
	<div class="piece-tray-header">
		<h3>Piece Tray</h3>
	</div>
	<div class="piece-tray-content">
		{#if pieces.length > 0}
			{#each pieces as piece (piece.id)}
				<PuzzlePiece {piece} />
			{/each}
		{:else}
			<div class="no-pieces">All pieces have been placed!</div>
		{/if}
	</div>
</div>

<style>
	.piece-tray-container {
		display: flex;
		flex-direction: column;
		border: 2px solid #ccc;
		border-radius: 8px;
		padding: 16px;
		background-color: #f9f9f9;
	}

	.piece-tray-header {
		margin-bottom: 12px;
	}

	.piece-tray-header h3 {
		margin: 0;
		font-size: 1.2em;
		color: #333;
	}

	.piece-tray-content {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		min-height: 100px;
	}

	.no-pieces {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		font-style: italic;
		color: #666;
	}
	.draggable-button {
		position: absolute; /* ОБЯЗАТЕЛЬНО - позволяет позиционировать через left/top */
		touch-action: none; /* Отключает стандартные тач-жесты браузера */
		user-select: none; /* Предотвращает выделение текста при перетаскивании */
		cursor: move; /* Показывает, что элемент можно перетаскивать */
		z-index: 10; /* Гарантирует, что кнопка над другими элементами */
		-webkit-touch-callout: none; /* Отключает контекстное меню на iOS */
		-webkit-user-select: none; /* Дополнительная защита от выделения на iOS */
	}
	.draggable-button.dragging {
		transform: scale(1.05);
		filter: drop-shadow(8px 16px 10px rgba(0, 0, 0, 0.3));
		-webkit-filter: drop-shadow(8px 16px 10px rgba(0, 0, 0, 0.3));
		cursor: grabbing;
	}
</style>
