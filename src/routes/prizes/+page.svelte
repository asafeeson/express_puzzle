<script lang="ts">
	import BigFortuneWheel from '$lib/assets/big_fortune_wheel_image.png';
	import BigMoneyImage from '$lib/assets/big_money_image.png';
	import Content from '$lib/components/Content.svelte';
	import Button from '$lib/components/Link.svelte';
	import TextStyle3D from '$lib/components/TextStyle3D.svelte';
	import type { PageData } from './$types';

	const prizesData = [
		{
			image: BigMoneyImage,
			title: '100 рублей',
			description: 'Деньги будут зачислены на кошелёк аккаунта или сразу переведены по СБП.'
		},
		{
			image: BigFortuneWheel,
			title: 'Колесо фортуны',
			description: 'Получи гарантированный промокод от партнеров или шанс на суперприз 1000 рублей.'
		}
	];
</script>

<Content>
	<h1 class="mt-[15%]"><TextStyle3D className="text-6xl">Призы</TextStyle3D></h1>
	<div class="space-y-6">
		<div
			class="relative bg-gradient-to-b from-[#FFA610] to-[#F66407] w-full rounded-4xl p-5 min-h-[170px]"
		>
			<img
				src={prizesData[0].image}
				alt={prizesData[0].title}
				class="absolute -left-6 top-1 drop-shadow-[-7px_10px_10.5px_rgba(0,0,0,0.25)] rotate-[20.267deg]"
			/>
			<div class="ms-[45%] space-y-2.5">
				<h6 class="font-extrabold text-lg">{prizesData[0].title}</h6>
				<p class="text-white text-sm">{prizesData[0].description}</p>
			</div>
		</div>
		<div
			class="relative bg-gradient-to-b from-[#FFA610] to-[#F66407] w-full rounded-4xl p-5 min-h-[170px]"
		>
			<img
				src={prizesData[1].image}
				alt={prizesData[1].title}
				class="absolute -right-6 -top-3 drop-shadow-[-7px_10px_10.5px_rgba(0,0,0,0.25)] rotate-[-16.644deg]"
			/>
			<div class="me-[40%] space-y-2.5">
				<h6 class="font-extrabold text-lg">{prizesData[1].title}</h6>
				<p class="text-white text-sm">{prizesData[1].description}</p>
			</div>
		</div>
	</div>
	<div class="flex flex-col justify-center items-center gap-4">
		<p>Для продолжения зарегистрируйтесь</p>
		<Button href="/select" title="ИГРАТЬ">Регистрация</Button>
	</div>
</Content>
