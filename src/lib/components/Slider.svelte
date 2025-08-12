<script lang="ts">
	import gsap from 'gsap';
	import { onMount } from 'svelte';
	import type { SlideItem } from '../types.js';

	interface Props {
		slides: SlideItem[];
		currentUrl?: string;
		currentSlide?: SlideItem;
		autoHeight?: boolean; // Новый prop для автоматического определения высоты
		fitToNaturalSize?: boolean; // Отображать изображения в натуральном размере, но не больше контейнера
	}

	let { slides, currentUrl = $bindable(), currentSlide = $bindable(), autoHeight = false, fitToNaturalSize = false }: Props = $props();

	let container: HTMLDivElement;
	let slideElements: HTMLDivElement[] = [];
	let currentIndex = $state(0);
	let isDragging = $state(false);
	let startX = $state(0);
	let isAnimating = $state(false);
	let containerHeight = $state<number | undefined>();

	// Update bindable props when current slide changes
	$effect(() => {
		if (slides.length > 0) {
			const slide = slides[currentIndex];
			currentUrl = slide?.url;
			currentSlide = slide ? { url: slide.url, title: slide.title } : undefined;
		}
	});

	// Initialize current index if currentUrl is provided
	$effect(() => {
		if (currentUrl && slides.length > 0) {
			const index = slides.findIndex((slide) => slide.url === currentUrl);
			if (index !== -1 && index !== currentIndex) {
				currentIndex = index;
			}
		}
	});

	// Initialize current index if currentSlide is provided
	$effect(() => {
		if (currentSlide && slides.length > 0) {
			const index = slides.findIndex((slide) => slide.url === currentSlide!.url);
			if (index !== -1 && index !== currentIndex) {
				currentIndex = index;
			}
		}
	});

	onMount(() => {
		if (slides.length > 0) {
			const slide = slides[0];
			currentUrl = slide.url;
			currentSlide = { url: slide.url, title: slide.title };
		}

		// Автоматическое определение высоты на основе первого изображения
		if (autoHeight && slides.length > 0) {
			const img = new Image();
			img.onload = () => {
				if (container) {
					const containerWidth = container.offsetWidth;
					const aspectRatio = img.naturalHeight / img.naturalWidth;
					containerHeight = containerWidth * aspectRatio;
				}
			};
			img.src = slides[0].url;
		}
	});

	function handlePointerDown(event: PointerEvent) {
		if (isAnimating) return;
		isDragging = true;
		startX = event.clientX;
		event.preventDefault();
	}

	function handleTouchStart(event: TouchEvent) {
		if (isAnimating) return;
		isDragging = true;
		startX = event.touches[0].clientX;
		event.preventDefault();
	}

	function handlePointerMove(event: PointerEvent) {
		if (!isDragging || isAnimating) return;
		event.preventDefault();
	}

	function handleTouchMove(event: TouchEvent) {
		if (!isDragging || isAnimating) return;
		// Убираем event.preventDefault(); - он не работает в пассивных слушателях
	}

	function handlePointerUp(event: PointerEvent) {
		if (!isDragging || isAnimating) return;
		isDragging = false;

		const endX = event.clientX;
		const deltaX = endX - startX;
		const threshold = 50; // minimum swipe distance

		if (Math.abs(deltaX) > threshold) {
			if (deltaX > 0 && currentIndex > 0) {
				// Swipe right - go to previous slide
				goToSlide(currentIndex - 1, 'right');
			} else if (deltaX < 0 && currentIndex < slides.length - 1) {
				// Swipe left - go to next slide
				goToSlide(currentIndex + 1, 'left');
			}
		}
	}

	function handleTouchEnd(event: TouchEvent) {
		if (!isDragging || isAnimating) return;
		isDragging = false;

		const endX = event.changedTouches[0].clientX;
		const deltaX = endX - startX;
		const threshold = 50; // minimum swipe distance

		if (Math.abs(deltaX) > threshold) {
			if (deltaX > 0 && currentIndex > 0) {
				// Swipe right - go to previous slide
				goToSlide(currentIndex - 1, 'right');
			} else if (deltaX < 0 && currentIndex < slides.length - 1) {
				// Swipe left - go to next slide
				goToSlide(currentIndex + 1, 'left');
			}
		}
	}

	function goToSlide(newIndex: number, direction: 'left' | 'right') {
		if (isAnimating || newIndex === currentIndex || newIndex < 0 || newIndex >= slides.length) {
			return;
		}

		isAnimating = true;
		const currentSlide = slideElements[currentIndex];
		const newSlide = slideElements[newIndex];

		if (!currentSlide || !newSlide) {
			isAnimating = false;
			return;
		}

		// Set initial position for new slide
		const moveDistance = direction === 'left' ? 100 : -100;
		gsap.set(newSlide, { x: `${-moveDistance}%`, opacity: 0, display: 'block' });

		// Create timeline for smooth animation
		const tl = gsap.timeline({
			onComplete: () => {
				currentIndex = newIndex;
				isAnimating = false;
				// Hide all slides except current
				slideElements.forEach((slide, index) => {
					if (index !== currentIndex) {
						gsap.set(slide, { display: 'none' });
					}
				});
			}
		});

		// Animate both slides simultaneously
		tl.to(
			currentSlide,
			{
				x: `${moveDistance}%`,
				opacity: 0,
				duration: 0.4,
				ease: 'power2.inOut'
			},
			0
		).to(
			newSlide,
			{
				x: '0%',
				opacity: 1,
				duration: 0.4,
				ease: 'power2.inOut'
			},
			0
		);
	}

	// Initialize slides positioning
	$effect(() => {
		if (slideElements.length === slides.length && slideElements.length > 0) {
			slideElements.forEach((slide, index) => {
				if (index === currentIndex) {
					gsap.set(slide, { x: '0%', opacity: 1, display: 'block' });
				} else {
					gsap.set(slide, { x: '0%', opacity: 0, display: 'none' });
				}
			});
		}
	});
</script>

<div
	bind:this={container}
	class="slider-container"
	class:auto-height={autoHeight}
	class:fit-natural-size={fitToNaturalSize}
	style:height={autoHeight && containerHeight ? `${containerHeight}px` : undefined}
	onpointerdown={handlePointerDown}
	onpointermove={handlePointerMove}
	onpointerup={handlePointerUp}
	onpointercancel={handlePointerUp}
	ontouchstart={handleTouchStart}
	ontouchmove={handleTouchMove}
	ontouchend={handleTouchEnd}
	role="region"
	aria-label="Image slider"
	style="touch-action: pan-y pinch-zoom;"
>
	{#each slides as slide, index (slide.url)}
		<div bind:this={slideElements[index]} class="slide" role="img" aria-label={slide.title}>
			{#if fitToNaturalSize}
				<div class="image-wrapper">
					<img
						src={slide.url}
						alt={slide.title}
						draggable="false"
						loading={index === 0 ? 'eager' : 'lazy'}
					/>
				</div>
			{:else}
				<img
					src={slide.url}
					alt={slide.title}
					draggable="false"
					loading={index === 0 ? 'eager' : 'lazy'}
				/>
			{/if}
		</div>
	{/each}
</div>

<style>
    .slider-container {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        touch-action: pan-y pinch-zoom; /* Это важно для предотвращения прокрутки */
        cursor: grab;
    }

    .slider-container.auto-height {
        height: auto;
    }

    .slider-container:active {
        cursor: grabbing;
    }

    .slide {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        will-change: transform, opacity;
    }

    .slide img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        user-select: none;
        pointer-events: none;
    }

    /* Wrapper для центрирования в режиме натурального размера */
    .fit-natural-size .image-wrapper {
        width: 100%;
        height: 100%;
        display: grid;
        place-items: center;
    }

    .fit-natural-size .image-wrapper img {
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
        object-fit: none;
    }
</style>
