<script lang="ts">
	import Button from '$lib/components/Link.svelte';
	import Content from '$lib/components/Content.svelte';
	import ImageContainer from '$lib/components/ImageContainer.svelte';
	import TextStyle3D from '$lib/components/TextStyle3D.svelte';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
</script>

<Content>
	<ImageContainer>
		<div class="overflow-hidden rounded-4xl swing-in-top-bck">
			<video autoplay loop muted playsinline>
				<source src="/owl-cat-animation.webm" type="video/webm" />
				<source src="/owl-cat-animation.mp4" type="video/mp4" />
				Ваш браузер не поддерживает видео.
			</video>
		</div>
	</ImageContainer>
	<div class="flex flex-col justify-center items-center gap-4">
		<h1 class="font-black text-2xl bounce-in-fwd">
			<TextStyle3D className="text-4xl">ПОЗДРАВЛЯЕМ!!!</TextStyle3D>
		</h1>
		<p class="text-center text-lg font-medium">
			Мы убедились, что ты не робот.<br />Остался всего один пазл — и приз твой!
		</p>
	</div>
	<div class="flex justify-between items-center">
		<Button href="/games/che" title="ИГРАТЬ">ИГРАТЬ</Button>
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
