<script lang="ts">
	import Content from '$lib/components/Content.svelte';
	import Slider from '$lib/components/Slider.svelte';
	import type { SlideItem } from '$lib/types.js';

	// Sample slides using actual project images
	const sampleSlides: SlideItem[] = [
		{
			url: '/pzz-che/0.png',
			title: 'Cheburek Puzzle Piece 0'
		},
		{
			url: '/pzz-che/1.png', 
			title: 'Cheburek Puzzle Piece 1'
		},
		{
			url: '/pzz-che/2.png',
			title: 'Cheburek Puzzle Piece 2'
		},
		{
			url: '/pzz-owl/owl-0.png',
			title: 'Owl Puzzle Piece 0'
		},
		{
			url: '/pzz-owl/owl-1.png',
			title: 'Owl Puzzle Piece 1'
		}
	];

	let currentUrl = $state('');
	let currentSlide = $state<SlideItem | undefined>();

	$effect(() => {
		console.log('Current slide URL:', currentUrl);
		console.log('Current slide object:', currentSlide);
	});
</script>

<svelte:head>
	<title>Slider Test</title>
</svelte:head>

<Content>
	<div class="slider-test-container">
		<h1>Slider Component Test</h1>
		<div class="slider-wrapper">
			<Slider slides={sampleSlides} bind:currentUrl bind:currentSlide />
		</div>
		<div class="info">
			<p><strong>Current URL:</strong> {currentUrl}</p>
			<p><strong>Current Title:</strong> {currentSlide?.title || 'None'}</p>
			<p><strong>Current Slide:</strong> {JSON.stringify(currentSlide)}</p>
			<p><strong>Instructions:</strong> Swipe left/right to navigate between slides</p>
			<p><strong>Total slides:</strong> {sampleSlides.length}</p>
		</div>
	</div>
</Content>

<style>
	.slider-test-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem;
	}

	h1 {
		color: #333;
		text-align: center;
		font-family: 'Baloo Cyrillic', sans-serif;
		font-weight: 900;
		font-size: 2rem;
	}

	.slider-wrapper {
		width: 100%;
		height: 400px;
		border: 3px solid #ff9a3c;
		border-radius: 15px;
		overflow: hidden;
		box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);
	}

	.info {
		text-align: center;
		color: #666;
		font-family: 'Baloo Cyrillic', sans-serif;
		font-size: 1.1rem;
	}

	.info p {
		margin: 0.5rem 0;
	}

	.info strong {
		color: #ff9a3c;
	}
</style>
