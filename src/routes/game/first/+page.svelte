<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
</script>

<div class="flex flex-col h-dvh px-6 pb-[10%]">
	<div
		class="flex flex-col justify-center items-center bg-secondary rounded-b-4xl overflow-hidden p-4 gap-6 min-h-[471px]"
	>
		<div class="overflow-hidden rounded-2xl aspect-square">
			<img src="/small_puzzle_image.png" alt="" class="h-full w-auto object-fill" />
		</div>
		<p class="text-center text-xl">Собери элементы пазла</p>
	</div>
	<div class="flex h-full justify-between items-center">
		<button
			class="flex items-center justify-center w-9 h-9 aspect-square rounded-full shadow-md convex-button"
		>
			&lt;
		</button>
		<div class="flex justify-between w-full px-auto gap-4 px-4">
			<img
				src="/puzzle_element.svg"
				alt=""
				class="drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)] w-[20%] opacity-40"
			/>
			<img
				src="/puzzle_element.svg"
				alt=""
				class="drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)] w-[40%]"
			/>
			<img
				src="/puzzle_element.svg"
				alt=""
				class="drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)] w-[20%] opacity-40"
			/>
		</div>
		<button
			class="flex items-center justify-center w-9 h-9 aspect-square rounded-full shadow-md convex-button"
		>
			&gt;
		</button>
	</div>
	<a class="uppercase text-center" href="/prizes/first">далее</a>
</div>

<style>
	.convex-button {
		/* Basic button dimensions and shape */
		border-width: 1px;
		border-color: #c27535;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%; /* Makes it perfectly circular */
		cursor: pointer;
		outline: none; /* Remove outline on focus */

		/* Convex 3D effect using gradients */
		background: linear-gradient(145deg, var(--color-main), var(--color-button));
		box-shadow: -5px 5px 10px rgba(0, 0, 0, 0.3);

		color: #000; /* Darker color for the icon/text */
		transition: all 0.2s ease-in-out; /* Smooth transitions for hover/active states */
	}
</style>
