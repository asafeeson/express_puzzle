<script lang="ts">
	import gsap from 'gsap';
	import { onMount } from 'svelte';
	import type { SlideItem } from '../types.js';

	interface Props {
		slides: SlideItem[];
		currentIndex?: number;
		autoHeight?: boolean;
		fitToNaturalSize?: boolean;
		onSlideChange?: (index: number, slide: SlideItem) => void;
	}

	let { 
		slides, 
		currentIndex = $bindable(0), 
		autoHeight = false, 
		fitToNaturalSize = false,
		onSlideChange 
	}: Props = $props();

	let container: HTMLDivElement;
	let slideElements: HTMLDivElement[] = [];
	let isDragging = $state(false);
	let startX = $state(0);
	let isAnimating = $state(false);

	// Единственный effect для синхронизации
	$effect(() => {
		if (slides.length > 0 && onSlideChange) {
			onSlideChange(currentIndex, slides[currentIndex]);
		}
	});

	// Универсальный обработчик жестов
	function handleGestureStart(clientX: number) {
		if (isAnimating) return false;
		isDragging = true;
		startX = clientX;
		return true;
	}

	function handleGestureEnd(clientX: number) {
		if (!isDragging || isAnimating) return;
		isDragging = false;

		const deltaX = clientX - startX;
		const threshold = 50;

		if (Math.abs(deltaX) > threshold) {
			const direction = deltaX > 0 ? -1 : 1;
			const newIndex = currentIndex + direction;
			
			if (newIndex >= 0 && newIndex < slides.length) {
				currentIndex = newIndex;
			}
		}
	}

	// Упрощенные обработчики событий
	const onPointerDown = (e: PointerEvent) => {
		if (handleGestureStart(e.clientX)) e.preventDefault();
	};
	const onPointerUp = (e: PointerEvent) => handleGestureEnd(e.clientX);
	const onTouchStart = (e: TouchEvent) => {
		if (handleGestureStart(e.touches[0].clientX)) e.preventDefault();
	};
	const onTouchEnd = (e: TouchEvent) => handleGestureEnd(e.changedTouches[0].clientX);

	// Анимация при изменении индекса
	$effect(() => {
		if (slideElements.length === slides.length) {
			animateToSlide(currentIndex);
		}
	});

	function animateToSlide(targetIndex: number) {
		if (isAnimating) return;
		isAnimating = true;

		slideElements.forEach((slide, index) => {
			if (index === targetIndex) {
				gsap.to(slide, { opacity: 1, duration: 0.3 });
			} else {
				gsap.to(slide, { opacity: 0, duration: 0.3 });
			}
		});

		setTimeout(() => {
			isAnimating = false;
		}, 300);
	}
</script>

<div
	bind:this={container}
	class="slider"
	class:auto-height={autoHeight}
	class:fit-natural={fitToNaturalSize}
	onpointerdown={onPointerDown}
	onpointerup={onPointerUp}
	ontouchstart={onTouchStart}
	ontouchend={onTouchEnd}
	role="region"
	aria-label="Image slider"
>
	{#each slides as slide, index (slide.url)}
		<div 
			bind:this={slideElements[index]} 
			class="slide"
			class:active={index === currentIndex}
			role="img" 
			aria-label={slide.title}
		>
			<img
				src={slide.url}
				alt={slide.title}
				draggable="false"
				loading={index === 0 ? 'eager' : 'lazy'}
			/>
		</div>
	{/each}
</div>

<style>
	.slider {
		position: relative;
		width: 100%;
		height: 100%;
		min-height: 200px;
		overflow: hidden;
		cursor: grab;
	}

	.slider:active { cursor: grabbing; }
	.slider.auto-height { height: auto; }

	.slide {
		position: absolute;
		inset: 0;
		display: grid;
		place-items: center;
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.slide.active {
		opacity: 1;
	}

	.slide img {
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
		user-select: none;
		pointer-events: none;
	}

	.fit-natural .slide img {
		width: auto;
		height: auto;
		object-fit: none;
	}
</style>
