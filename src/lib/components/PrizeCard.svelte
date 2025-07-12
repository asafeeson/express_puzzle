<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		href: string;
		imgSrc: string;
		imgAlt: string;
		title: string;
		description: string;
		imgHeight: number;
		imgWidth: number;
	}
	let { href, imgSrc, imgAlt, title, description, imgHeight, imgWidth }: Props = $props();
</script>

<a
	{href}
	class="w-full flex flex-1/2 flex-col px-3.5 py-8 items-center text-center gap-4 rounded-2xl bg-secondary layer-shadow hover:bg-[#FAC783] hover:z-1"
>
	<enhanced:img src={imgSrc} alt={imgAlt} class="aspect-square block w-auto h-auto" />
	<enhanced:img
		src="/static/avatar.png?h=100&format=webp&quality=100&lossless=true"
		alt="User Avatar Placeholder Picture"
		width="100"
		height="100"
	/>
	<div class="flex flex-col justify-between gap-7 font-medium text-center">
		<h2 class="text-lg">{title}</h2>
		<p class="text-sm">{description}</p>
	</div>
</a>
