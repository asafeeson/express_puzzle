<script lang="ts">
	import RoundButton from '$lib/components/RoundButton.svelte';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
</script>

<div class="flex flex-col h-dvh px-6 pb-[10%]">
	<div
		class="flex flex-col justify-center items-center bg-secondary rounded-b-4xl overflow-hidden p-4 gap-6 min-h-[471px]"
	>
		<div
			class="overflow-hidden rounded-2xl aspect-square relative w-full gap-4 grid place-items-center"
		>
			<img
				src="/small_puzzle_overlay.png"
				alt=""
				class="invert h-full w-auto object-fill absolute z-1 mix-blend-multiply"
			/>
			<img src="/small_puzzle_image.png" alt="" class="h-full w-auto object-fill absolute z-0" />
		</div>
		<p class="text-center text-xl">Собери элементы пазла</p>
	</div>
	<div class="flex h-full justify-between items-center">
		<RoundButton flipY></RoundButton>
		<div class="flex justify-between items-center w-full px-auto gap-4 px-4">
			<img
				src="/puzzle_filled_small.png"
				alt=""
				class="drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)] h-[20%] w-[20%] opacity-40"
			/>
			<img
				src="/puzzle_filled_small.png"
				alt=""
				class="drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)] w-[40%]"
			/>
			<img
				src="/puzzle_filled_small.png"
				alt=""
				class="drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)] h-[20%] w-[20%] opacity-40"
			/>
		</div>
		<RoundButton></RoundButton>
	</div>
	<a class="uppercase text-center" href="/prizes/first">далее</a>
</div>