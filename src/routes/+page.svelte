<script lang="ts">
	import Content from '$lib/components/Content.svelte';
	import ImageContainer from '$lib/components/ImageContainer.svelte';
	import TextStyle3D from '$lib/components/TextStyle3D.svelte';
	import { fly } from 'svelte/transition';
	import Button from '../lib/components/Button.svelte';

	import type { PageData } from './$types';
	import { quintOut } from 'svelte/easing';
	import { onMount } from 'svelte';

	const { data }: { data: PageData } = $props();
	let isMounted = $state<boolean>(false);
	onMount(() => {
		isMounted = true;
	});
</script>

<Content>
	<ImageContainer>
		<div class="overflow-hidden rounded-2xl aspect-square swing-in-top-bck">
			<video autoplay loop muted playsinline>
				<source src="/intro-animation.webm" type="video/webm" />
				<source src="/intro-animation.mp4" type="video/mp4" />
				Ваш браузер не поддерживает видео.
			</video>
		</div>
	</ImageContainer>
	<h1 class="mx-auto text-center self-center bounce-in-fwd">
		<TextStyle3D className={'text-4xl'}>СОБЕРИ ЭЛЕМЕНТЫ ПАЗЛА</TextStyle3D>
	</h1>
	<div class="h-[120px] mx-auto">
		{#if isMounted}
			<div
				in:fly|global={{ delay: 300, duration: 600, x: 0, y: 500, opacity: 0.5, easing: quintOut }}
			>
				<Button href="games/owl" title="играть">играть</Button>
			</div>
		{/if}
	</div>
</Content>

<style>
	.swing-in-top-bck {
		-webkit-animation: swing-in-top-bck 1.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) 300ms both;
		animation: swing-in-top-bck 1.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) 200ms both;
	}

	.bounce-in-fwd {
		-webkit-animation: bounce-in-fwd 1.3s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
		animation: bounce-in-fwd 1.3s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
	}

	@-webkit-keyframes bounce-in-fwd {
		0% {
			-webkit-transform: scale(0);
			transform: scale(0);
			-webkit-animation-timing-function: ease-in;
			animation-timing-function: ease-in;
			opacity: 0;
		}
		38% {
			-webkit-transform: scale(1);
			transform: scale(1);
			-webkit-animation-timing-function: ease-out;
			animation-timing-function: ease-out;
			opacity: 1;
		}
		55% {
			-webkit-transform: scale(0.7);
			transform: scale(0.7);
			-webkit-animation-timing-function: ease-in;
			animation-timing-function: ease-in;
		}
		72% {
			-webkit-transform: scale(1);
			transform: scale(1);
			-webkit-animation-timing-function: ease-out;
			animation-timing-function: ease-out;
		}
		81% {
			-webkit-transform: scale(0.84);
			transform: scale(0.84);
			-webkit-animation-timing-function: ease-in;
			animation-timing-function: ease-in;
		}
		89% {
			-webkit-transform: scale(1);
			transform: scale(1);
			-webkit-animation-timing-function: ease-out;
			animation-timing-function: ease-out;
		}
		95% {
			-webkit-transform: scale(0.95);
			transform: scale(0.95);
			-webkit-animation-timing-function: ease-in;
			animation-timing-function: ease-in;
		}
		100% {
			-webkit-transform: scale(1);
			transform: scale(1);
			-webkit-animation-timing-function: ease-out;
			animation-timing-function: ease-out;
		}
	}
	@keyframes bounce-in-fwd {
		0% {
			-webkit-transform: scale(0);
			transform: scale(0);
			-webkit-animation-timing-function: ease-in;
			animation-timing-function: ease-in;
			opacity: 0;
		}
		38% {
			-webkit-transform: scale(1);
			transform: scale(1);
			-webkit-animation-timing-function: ease-out;
			animation-timing-function: ease-out;
			opacity: 1;
		}
		55% {
			-webkit-transform: scale(0.7);
			transform: scale(0.7);
			-webkit-animation-timing-function: ease-in;
			animation-timing-function: ease-in;
		}
		72% {
			-webkit-transform: scale(1);
			transform: scale(1);
			-webkit-animation-timing-function: ease-out;
			animation-timing-function: ease-out;
		}
		81% {
			-webkit-transform: scale(0.84);
			transform: scale(0.84);
			-webkit-animation-timing-function: ease-in;
			animation-timing-function: ease-in;
		}
		89% {
			-webkit-transform: scale(1);
			transform: scale(1);
			-webkit-animation-timing-function: ease-out;
			animation-timing-function: ease-out;
		}
		95% {
			-webkit-transform: scale(0.95);
			transform: scale(0.95);
			-webkit-animation-timing-function: ease-in;
			animation-timing-function: ease-in;
		}
		100% {
			-webkit-transform: scale(1);
			transform: scale(1);
			-webkit-animation-timing-function: ease-out;
			animation-timing-function: ease-out;
		}
	}

	@-webkit-keyframes swing-in-top-bck {
		0% {
			-webkit-transform: rotateX(70deg);
			transform: rotateX(70deg);
			-webkit-transform-origin: top;
			transform-origin: top;
			opacity: 0;
		}
		100% {
			-webkit-transform: rotateX(0deg);
			transform: rotateX(0deg);
			-webkit-transform-origin: top;
			transform-origin: top;
			opacity: 1;
		}
	}
	@keyframes swing-in-top-bck {
		0% {
			-webkit-transform: rotateX(70deg);
			transform: rotateX(70deg);
			-webkit-transform-origin: top;
			transform-origin: top;
			opacity: 0;
		}
		100% {
			-webkit-transform: rotateX(0deg);
			transform: rotateX(0deg);
			-webkit-transform-origin: top;
			transform-origin: top;
			opacity: 1;
		}
	}
</style>
