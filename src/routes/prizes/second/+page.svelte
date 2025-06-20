<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
</script>

<div class="flex flex-col h-dvh px-6 pb-[10%]">
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
		<Button url="/prizes/choose" name="забрать приз"></Button>
	</div>
</div>
