<script lang="ts">
	import Content from '$lib/components/Content.svelte';
	import ImageContainer from '$lib/components/ImageContainer.svelte';
	import TextStyle3D from '$lib/components/TextStyle3D.svelte';
	import UserProfileHeader from '$lib/components/UserProfileHeader.svelte';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
</script>

{#snippet choosePrize(
	href: string,
	imgSrc: string,
	imgAlt: string,
	title: string,
	description: string
)}
	<a
		{href}
		class="w-full flex flex-1/2 flex-col px-3.5 py-8 items-center text-center gap-4 rounded-2xl bg-secondary layer-shadow hover:bg-[#FAC783] hover:z-1"
	>
		<img src={imgSrc} alt={imgAlt} class="aspect-square block w-auto h-auto" />
		<div class="flex flex-col justify-between gap-7 font-medium text-center">
			<h2 class="text-lg">{title}</h2>
			<p class="text-sm">{description}</p>
		</div>
	</a>
{/snippet}

<Content className="gap-8">
	<ImageContainer>
		<UserProfileHeader />
	</ImageContainer>
	<TextStyle3D className="text-4xl">Выбор приза</TextStyle3D>
	<div class="flex gap-0.5 w-full justify-center h-full items-stretch">
		{@render choosePrize(
			'/kefir',
			'/money_icon.png',
			'деньги хочу',
			'Забрать приз 100 рублей',
			'деньги будут зачислены на кошелек аккаунта или сразу переведуться по сбп'
		)}
		{@render choosePrize(
			'/fortune',
			'/fortune_icon.png',
			'удачу испытать хочу',
			'Сыграть в колесо фортуны',
			'призы и промокоды'
		)}
	</div>
</Content>

<style>
	@layer components {
		.layer-shadow {
			box-shadow:
				-9px 7px 4.9px rgba(0, 0, 0, 0.05),
				inset -2px -3px 1.2px rgba(255, 255, 255, 0.25);
		}
	}
</style>
