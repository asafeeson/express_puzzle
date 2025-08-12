<script lang="ts">
	import Slider from './Slider.svelte';
	import slidesData from '$lib/data/prizesSliderData';

	let currentSlide = $state<{ url: string; title: string }>({ url: '', title: 'Заглушка' });
</script>

<div class="flex flex-col rounded-b-2xl gap-3 layer-shadow overflow-hidden w-full ">
	<div class="h-44 p-6">
		<Slider slides={slidesData} fitToNaturalSize={true} bind:currentSlide></Slider>
	</div>
	<div class="text-sm bg-secondary px-8 py-4">
		<p class="text-lg font-extrabold text-center">{currentSlide.title}</p>
	</div>
</div>

<style>
	@layer components {
		.layer-shadow {
			box-shadow:
				-9px 7px 4.9px rgba(0, 0, 0, 0.05),
				inset -2px -3px 1.2px rgba(255, 255, 255, 0.25);
		}
	}
</style>
