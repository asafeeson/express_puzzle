<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { fly } from 'svelte/transition';
	import type { PageData } from './$types';
	import { quintOut } from 'svelte/easing';

	const { data }: { data: PageData } = $props();
	let wheel: HTMLElement;
	let showPop = $state(false);
</script>

<div class="flex flex-col h-dvh px-6 pb-[10%] gap-6 relative overflow-auto">
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
	<div class="flex flex-col justify-center items-center h-full gap-6">
		<h1 class="font-black text-2xl">Нажми и крути</h1>
		<div class="flex w-full justify-center items-center relative">
			<img
				src="/arrow.png"
				alt=""
				class="transition-transform duration-700 absolute -top-5 drop-shadow-xl z-1 h-10"
			/>
			<img
				src="/wheel.png"
				alt=""
				class="transition-transform duration-700"
				bind:this={wheel}
			/>
		</div>
	</div>
	<div class="flex justify-between items-end">
		<button
			type="button"
			class="w-full h-16 bg-button grid place-content-center rounded-4xl uppercase font-bold text-2xl cursor-pointer"
			onclick={() => {
				wheel.style.transform = 'rotate(360deg)';
				setTimeout(() => {
					wheel.style.transform = '';
				}, 700);
				showPop = !showPop;
			}}
			>КРУТИТЬ
		</button>
	</div>
	{#if showPop}
		<div
			class="w-full h-1/2 absolute bottom-0 left-0 px-4 z-2"
			transition:fly={{ delay: 1400, duration: 400, x: 0, y: 400, opacity: 0.5, easing: quintOut }}
		>
			<div
				class="bg-secondary/90 h-full w-full p-10 rounded-t-2xl justify-between items-center flex flex-col"
			>
				<h2 class="font-bold">Вы выиграли</h2>
				<p>Описания приза</p>
				<Button url="/kefir" name="забрать приз"></Button>
			</div>
		</div>
	{/if}
</div>
