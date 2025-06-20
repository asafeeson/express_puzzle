<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
</script>

<div class="flex flex-col h-dvh px-6 pb-[10%]">
	<div
		class="flex flex-col justify-center items-center bg-secondary rounded-b-4xl overflow-hidden p-4 gap-6 min-h-[471px]"
	>
		<div class="overflow-hidden rounded-2xl aspect-square relative w-full grid place-items-center">
			<img
				src="/small_puzzle_overlay_black.png"
				alt=""
				class=" invert h-full w-auto object-fill absolute z-1 opacity-100 mix-blend-color-burn inset-0"
			/>
			<img
				src="/small_puzzle_image.png"
				alt=""
				class="h-full w-auto object-fill absolute z-0 inset-0"
			/>
		</div>
		<p class="text-center text-xl">Ура!</p>
	</div>
	<div class="flex flex-col justify-center items-center h-full gap-4">
		<h1 class="font-black text-2xl">Поздравляем!</h1>
		<p class="text-center">Мы убедились что вы не робот. Теперь сыграем по-настоящему!</p>
	</div>
	<div class="flex h-full justify-between items-center">
		<Button url="/game/second" name="ИГРАТЬ"></Button>
	</div>
</div>
