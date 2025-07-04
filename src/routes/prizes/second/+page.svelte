<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
	let showKefirModal = $state<Boolean>(false);
</script>

<div class="flex flex-col h-dvh px-6 pb-[10%] relative">
	<div
		class="flex flex-col justify-center items-center bg-secondary rounded-b-4xl overflow-hidden gap-6 min-h-[471px] w-full py-6"
	>
		<div class="overflow-hidden rounded-2xl aspect-square relative w-full grid place-items-center">
			<img
				src="/big_puzzle_overlay_black.png"
				alt=""
				class="h-full w-auto object-fill absolute z-1 opacity-100 mix-blend-difference"
			/>
			<img src="/big_puzzle_image.png" alt="" class="h-full w-auto object-fill absolute z-0" />
		</div>
		<p class="text-center text-xl">Супер!</p>
	</div>
	<div class="flex flex-col justify-center items-center h-full gap-4">
		<h1 class="font-black text-2xl">Поздравляем!</h1>
		<p class="text-center">
			Вы выиграли! Чтобы забрать приз, <span class="underline hover:font-bold"
				>войдите или зарегистрируйтесь</span
			>
		</p>
	</div>
	<div class="flex h-full justify-between items-center">
		<button
			class="w-full h-16 bg-button grid place-content-center rounded-4xl uppercase font-bold text-2xl cursor-pointer"
			onclick={() => (showKefirModal = !showKefirModal)}
		>
			забрать приз
		</button>
	</div>

	{#if showKefirModal}
		<div
			class="grid place-content-center w-[300px] h-auto py-6 px-6 bg-white shadow-2xl absolute z-100 rounded-2xl top-1/2 left-1/2 -translate-x-1/2 border-2 border-white"
			transition:fade={{ delay: 250, duration: 300 }}

		>
			<span>В этот момент Пользователь регистрируется на кефире</span>
			<a
				href="/prizes/choose"
				class="bg-main uppercase px-4 py-2 w-full rounded-2xl text-center"
			>далее --&gt;</a>
		</div>
	{/if}
</div>
