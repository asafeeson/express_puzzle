<script lang="ts">
	import Content from '$lib/components/Content.svelte';
	import ImageContainer from '$lib/components/ImageContainer.svelte';
	import TextStyle3D from '$lib/components/TextStyle3D.svelte';
	import Button from '../lib/components/Button.svelte';

	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
</script>

<Content>
	<ImageContainer>
		<div class="overflow-hidden rounded-2xl aspect-square">
			<video autoplay loop muted playsinline>
				<source src="/intro-animation.webm" type="video/webm" />
				<source src="/intro-animation.mp4" type="video/mp4" />
				Ваш браузер не поддерживает видео.
			</video>
		</div>
	</ImageContainer>
	<h1 class="mx-auto text-center self-center">
		<TextStyle3D>СОБЕРИ ЭЛЕМЕНТЫ ПАЗЛА</TextStyle3D>
	</h1>
	<Button url="game/first" name="играть"></Button>
</Content>
