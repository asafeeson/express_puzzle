<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		title?: string;
		onClick: () => void;

	}
	const { children, onClick, title }: Props = $props();
</script>

<button type="button" onclick={onClick} {title} aria-label={title} class="ddd-button">
	{@render children()}
</button>
