<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { PageData } from './$types';
	import ImageContainer from '$lib/components/ImageContainer.svelte';
	import TextStyle3D from '$lib/components/TextStyle3D.svelte';
	import Content from '$lib/components/Content.svelte';
	import Button from '$lib/components/Button.svelte';

	const { data }: { data: PageData } = $props();
	let showKefirModal = $state<Boolean>(false);
</script>

<Content>
	<ImageContainer>
		<div class="overflow-hidden rounded-4xl swing-in-top-bck">
			<video autoplay loop muted playsinline>
				<source src="/cheburek-animation.webm" type="video/webm" />
				<source src="/cheburek-animation.mp4" type="video/mp4" />
				Ваш браузер не поддерживает видео.
			</video>
		</div>
	</ImageContainer>
	<div class="flex flex-col justify-center items-center gap-4">
		<h1 class="font-black text-2xl bounce-in-fwd">
			<TextStyle3D className="text-4xl">ПОЗДРАВЛЯЕМ!!!</TextStyle3D>
		</h1>
		<p class="text-center text-lg font-medium">
			Вы выиграли! Чтобы забрать приз, войдите или зарегистрируйтесь
		</p>
	</div>
	<div class="flex justify-between items-center">
		<Button href="/choose" title="ИГРАТЬ">Забрать приз</Button>
	</div>
	

	{#if showKefirModal}
		<div
			class="grid place-content-center w-[300px] h-auto py-6 px-6 bg-white shadow-2xl absolute z-100 rounded-2xl top-1/2 left-1/2 -translate-x-1/2 border-2 border-white"
			transition:fade={{ delay: 250, duration: 300 }}
		>
			<span>В этот момент Пользователь регистрируется на кефире</span>
			<a href="/prizes/choose" class="bg-main uppercase px-4 py-2 w-full rounded-2xl text-center"
				>далее --&gt;</a
			>
		</div>
	{/if}
</Content>
