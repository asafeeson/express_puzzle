<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Content from '$lib/components/Content.svelte';
	import ImageContainer from '$lib/components/ImageContainer.svelte';
	import TextStyle3D from '$lib/components/TextStyle3D.svelte';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
</script>

<Content>
	<ImageContainer>
		<div class="overflow-hidden rounded-2xl">
			<video autoplay loop muted playsinline>
				<source src="/owl-cat-animation.webm" type="video/webm" />
				<source src="/owl-cat-animation.mp4" type="video/mp4" />
				Ваш браузер не поддерживает видео.
			</video>
		</div>
	</ImageContainer>
	<div class="flex flex-col justify-center items-center gap-4">
		<h1 class="font-black text-2xl">
			<TextStyle3D className="text-4xl">ПОЗДРАВЛЯЕМ!!!</TextStyle3D>
		</h1>
		<p class="text-center text-lg font-medium">
			Мы убедились что вы не робот. Теперь сыграем по-настоящему!)
		</p>
	</div>
	<div class="flex justify-between items-center">
		<Button href="/game/second" title="ИГРАТЬ">ИГРАТЬ</Button>
	</div>
</Content>
