<script lang="ts">
	import Slider from './Slider.svelte';
	import slidesData from '$lib/data/prizesSliderData';
	import SliderOptimized from './SliderOptimized.svelte';

	interface Props {
		currentSlide?: { url: string; title: string };
		autoPlay?: boolean;
	}

	let { autoPlay = $bindable() }: Props = $props();
	let currentSlide = $state<{ url: string; title: string }>({ url: '', title: 'Заглушка' });
</script>

<div class="flex flex-col rounded-b-2xl gap-3 layer-shadow overflow-hidden w-full">
	<div class="h-44 p-6">
		<SliderOptimized
			slides={slidesData}
			fitToNaturalSize={true}
			bind:currentSlide
			autoPlay={true}
			autoPlayInterval={1000}
		></SliderOptimized>
	</div>
	<div class="text-sm bg-secondary px-8 py-4 h-20 flex justify-center items-center">
		<p class="text-lg font-extrabold text-center">{currentSlide.title}</p>
	</div>
</div>
