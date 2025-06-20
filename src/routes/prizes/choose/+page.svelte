<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
</script>

<div class="flex flex-col h-dvh px-6 pb-[10%] gap-6">
	<div
		class="flex flex-col justify-center items-center bg-secondary rounded-b-4xl gap-6 w-full py-10"
	>
		<div class="overflow-hidden rounded-full w-[92px] aspect-square gap-4 bg-[#D9D9D9]">
			<img src="/user_icon.svg" alt="" class="h-full w-auto object-fill" />
		</div>
		<div class="flex flex-col gap-2 items-center">
			<span class="font-extrabold text-2xl">Name user</span>
			<span class="text-sm">Почта@mail.ru</span>
			<span class="text-sm">Зарегистрирован дд.мм.гггг</span>
		</div>
	</div>
	<div class="flex flex-col justify-center items-center h-full gap-4">
		<h1 class="font-black text-2xl">Выбрать приз</h1>
		<div class="flex gap-4 w-full">
			<a
				href="/kefir"
				class="w-full flex flex-1/2 flex-col px-2 py-10 items-center text-center gap-4 rounded-2xl bg-secondary hover:shadow-xl transition"
			>
				<img src="/icon_money.png" alt="" class="h-[75px] aspect-square object-contain" />
				<div class="flex flex-col justify-between gap-4">
					<h2>Забрать приз 100 рублей</h2>
					<p class="text-sm">
						деньги будут зачислены на кошелек аккаунта или сразу переведуться по сбп
					</p>
				</div>
			</a>
			<a
				href="/prizes/fortune"
				class="w-full flex flex-1/2 flex-col px-2 py-10 text-center gap-4 rounded-2xl bg-secondary hover:shadow-xl transition"
			>
				<img src="/icon_fortune.png" alt="" class="h-[75px] aspect-square object-contain" />
				<div class="flex flex-col h-full gap-4">
					<h2>Сыграть в колесо фортуны</h2>
					<p class="text-center text-sm">призы и промокоды</p>
				</div>
			</a>
		</div>
	</div>
</div>
