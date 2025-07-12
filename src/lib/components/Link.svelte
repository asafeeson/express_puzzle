<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		title: string;
		href: string;
	}
	const { children, href, title }: Props = $props();
</script>

<a {href} {title} aria-label={title} class="ddd-button">
	{@render children()}
</a>

<style>
	.ddd-button {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 20px 20px;
		gap: 10px;
		width: 328px;
		height: 87px;
		background: #ff9a3c;
		box-shadow:
			0px 4px 15px rgba(0, 0, 0, 0.15),
			inset 0px -4px 4px rgba(0, 0, 0, 0.3),
			inset 0px 4px 4px rgba(255, 255, 255, 0.35);
		border-radius: 35px;

		font-family: 'Baloo Cyrillic', sans-serif;
		font-style: normal;
		font-weight: 900;
		font-size: 30px;
		line-height: 47px;
		text-align: center;
		text-transform: uppercase;
		color: #ffffff;
		text-shadow:
			-1px 1px 1.6px rgba(0, 0, 0, 0.25),
			1px 2px 4.5px rgba(0, 0, 0, 0.25);
	}
	.ddd-button:active,
	.ddd-button:hover {
		box-shadow:
			0px 4px 15px rgba(0, 0, 0, 0.15),
			inset 0px 4px 4px rgba(0, 0, 0, 0.3),
			inset 0px -4px 4px rgba(255, 255, 255, 0.35);
		text-shadow:
			-1px 1px 1.6px rgba(0, 0, 0, 0.25),
			0px 0px 4.5px rgba(0, 0, 0, 0.25);
	}
</style>
