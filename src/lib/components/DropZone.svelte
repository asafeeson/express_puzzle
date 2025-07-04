<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		id: number;
		onDrop: (id: number, pieceId: number) => void;
		children?: Snippet;
	}

	let { id, onDrop, children }: Props = $props();

	function handleDragOver(e: DragEvent): void {
		e.preventDefault();
	}

	function handleDrop(e: DragEvent): void {
		e.preventDefault();
		const pieceId = e.dataTransfer?.getData('pieceId');
		if (pieceId) {
			onDrop(id, parseInt(pieceId, 10));
		}
	}
</script>

<div
	role="button"
	tabindex="0"
	ondragover={handleDragOver}
	ondrop={handleDrop}
	class="rounded-lg aspect-square transition-colors duration-300 "
>
	{@render children?.()}
</div>
