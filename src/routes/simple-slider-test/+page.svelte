<script lang="ts">
	import Slider from '$lib/components/Slider.svelte';
	import slidesData from '$lib/data/prizesSliderData';
	import type { SlideItem } from '$lib/types.js';

	// Простые тестовые слайды
	const testSlides: SlideItem[] = slidesData;

	let currentUrl = $state('');
	let currentSlide = $state<SlideItem | undefined>();
</script>

<svelte:head>
	<title>Simple Slider Test</title>
</svelte:head>

<div class="page-container">
	<h1>Simple Slider Test</h1>
	
	<h2>Тест 1: Фиксированная высота</h2>
	<div class="test-container fixed-height">
		<Slider slides={testSlides} bind:currentUrl bind:currentSlide />
	</div>
	<p>Current: {currentSlide?.title || 'None'}</p>

	<h2>Тест 2: Автоматическая высота</h2>
	<div class="test-container auto-height">
		<Slider slides={testSlides} autoHeight={true} />
	</div>

	<h2>Тест 3: Встроенный размер</h2>
	<div class="test-container inline-size">
		<Slider slides={testSlides} />
	</div>

	<h2>Тест 4: Натуральный размер изображений (новое!)</h2>
	<div class="test-container natural-size">
		<Slider slides={testSlides} fitToNaturalSize={true} />
	</div>

	<h2>Тест 5: Натуральный размер + автовысота</h2>
	<div class="test-container natural-auto">
		<Slider slides={testSlides} fitToNaturalSize={true} autoHeight={true} />
	</div>
</div>

<style>
	.page-container {
		padding: 20px;
		max-width: 800px;
		margin: 0 auto;
		font-family: Arial, sans-serif;
	}

	h1, h2 {
		color: #333;
		margin: 20px 0 10px 0;
	}

	.test-container {
		border: 2px solid #007acc;
		margin: 10px 0 20px 0;
		background-color: #f5f5f5;
	}

	.fixed-height {
		height: 300px;
		width: 100%;
	}

	.auto-height {
		width: 100%;
	}

	.inline-size {
		width: 400px;
		height: 250px;
	}

	.natural-size {
		width: 100%;
		height: 300px;
		border-color: #ff6b00;
	}

	.natural-auto {
		width: 100%;
		border-color: #00c851;
	}

	p {
		color: #666;
		margin: 5px 0;
	}
</style>
