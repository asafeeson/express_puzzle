<!-- PieceTray.svelte -->
<script lang="ts">
	import PuzzlePiece from './PuzzlePiece.svelte';
    import type { PuzzlePieceType } from '$lib/types';

	interface Props {
		pieces: PuzzlePieceType[];
	}

	let { pieces }: Props = $props();
</script>

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
</style>
