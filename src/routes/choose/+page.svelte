<script lang="ts">
	import Content from '$lib/components/Content.svelte';
	import ImageContainer from '$lib/components/ImageContainer.svelte';
	import TextStyle3D from '$lib/components/TextStyle3D.svelte';
	import UserProfileHeader from '$lib/components/UserProfileHeader.svelte';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
</script>

{#snippet choosePrizeVer({
	href,
	imgSrc,
	imgAlt,
	title,
	description
}: {
	href: string;
	imgSrc: string;
	imgAlt: string;
	title: string;
	description: string;
})}
	<a
		{href}
		class="w-full flex flex-1/2 flex-col px-3.5 py-8 items-center text-center gap-4 rounded-2xl bg-secondary layer-shadow hover:bg-[#FAC783] hover:z-1"
	>
		<img src={imgSrc} alt={imgAlt} class="block w-auto h-auto" />
		<div class="flex flex-col justify-between gap-7 font-medium text-center">
			<h2 class="text-lg">{title}</h2>
			<p class="text-sm">{description}</p>
		</div>
	</a>
{/snippet}

{#snippet choosePrizeHor({
	href,
	imgSrc,
	imgAlt,
	title,
	description,
	imgPosition
}: {
	href: string;
	imgSrc: string;
	imgAlt: string;
	title: string;
	description: string;
	imgPosition: 'left' | 'right';
})}
	<a
		{href}
		class="w-full h-full flex px-6 py-6 items-center text-center gap-6 rounded-2xl bg-secondary layer-shadow hover:bg-[#FAC783] hover:z-1"
	>
		{#if imgPosition === 'left'}
			<img src={imgSrc} alt={imgAlt} class="block w-auto h-auto" />
		{/if}
		<div
			class="flex flex-col justify-between gap-1.5 font-medium"
			class:text-right={imgPosition === 'right'}
			class:text-left={imgPosition === 'left'}
		>
			<h2 class="text-lg font-extrabold">{title}</h2>
			<p class="text-sm text-gray-500">{description}</p>
		</div>
		{#if imgPosition === 'right'}
			<img src={imgSrc} alt={imgAlt} class="block w-auto h-auto" />
		{/if}
	</a>
{/snippet}

<Content className="gap-8 justify-start">
	<UserProfileHeader />
	<div class="flex flex-col gap-4 h-full">
		<TextStyle3D className="text-4xl">Выбор приза</TextStyle3D>
		<div class="flex flex-col gap-4 w-full justify-center h-full">
			{@render choosePrizeHor({
				href: '/fortune',
				imgSrc: '/fortune_icon.png',
				imgAlt: 'удачу испытать хочу',
				title: 'Сыграть в колесо фортуны',
				description: 'призы и промокоды',
				imgPosition: 'left'
			})}
			{@render choosePrizeHor({
				href: '/kefir',
				imgSrc: '/money_icon.png',
				imgAlt: 'деньги хочу',
				title: 'Забрать приз 100 рублей',
				description: 'деньги будут зачислены на кошелек аккаунта или сразу переведутся по СБП',
				imgPosition: 'left'
			})}
		</div>
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
