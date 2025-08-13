<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		title: string;
		href: string;
		disabled?: boolean;
	}
	const { children, href, title, disabled = false, ...restProps }: Props = $props();
</script>

<a
	{href}
	{title}
	aria-label={title}
	class="ddd-button"
	aria-disabled={disabled}
	{...restProps}
>
	{@render children()}
</a>
