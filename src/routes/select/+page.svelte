<script lang="ts">
	import fortuneIconPNG from '$lib/assets/fortune-icon.png';
	import moneyIconPNG from '$lib/assets/money-icon.png';
	import Content from '$lib/components/Content.svelte';
	import TextStyle3D from '$lib/components/TextStyle3D.svelte';
	import UserProfileHeader from '$lib/components/UserProfileHeader.svelte';
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
		class="w-full flex flex-1/2 flex-col px-3.5 py-7 items-center text-center gap-4 rounded-2xl bg-secondary layer-shadow active:bg-[#FAC783] hover:z-1 justify-start"
	>
		<div class="aspect-square grid place-items-center w-20">
			<img src={imgSrc} alt={imgAlt} class="block w-auto h-auto" />
		</div>
		<div class="flex flex-col justify-between gap-7 font-medium text-center">
			<h2 class="text-lg/[calc()] font-extrabold">{title}</h2>
		</div>
		<div>
			<p class="text-xs">{description}</p>
		</div>
	</a>
{/snippet}

<Content className="gap-8 justify-start">
	<UserProfileHeader />
	<div class="flex flex-col gap-4 h-full">
		<TextStyle3D className="text-4xl">Выбор приза</TextStyle3D>
		<div class="flex gap-0.5 w-full justify-center">
			{@render choosePrizeVer({
				href: '/fortune',
				imgSrc: fortuneIconPNG,
				imgAlt: 'Сыграть в колесо фортуны',
				title: 'Сыграть в колесо фортуны',
				description:
					'Получи гарантированный промокод от партнеров или шанс на суперприз 1000 рублей.'
			})}
			{@render choosePrizeVer({
				href: '/kefir',
				imgSrc: moneyIconPNG,
				imgAlt: 'Забрать приз 100 рублей',
				title: 'Забрать приз 100 рублей',
				description: 'Деньги будут зачислены на кошелёк аккаунта или сразу переведены по СБП.'
			})}
		</div>
	</div>
</Content>
