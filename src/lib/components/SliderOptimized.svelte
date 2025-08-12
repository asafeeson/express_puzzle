<script lang="ts">
	import gsap from 'gsap';
	import { onMount, onDestroy } from 'svelte';
	import type { SlideItem } from '../types.js';

	// Props compatible with original Slider.svelte
	interface Props {
		slides: SlideItem[];
		currentUrl?: string;
		currentSlide?: SlideItem;
		autoHeight?: boolean;
		fitToNaturalSize?: boolean;
		autoPlay?: boolean;
		autoPlayInterval?: number;
		pauseOnHover?: boolean;
	}

	let {
		slides,
		currentUrl = $bindable(),
		currentSlide = $bindable(),
		autoHeight = false,
		fitToNaturalSize = false,
		autoPlay = false,
		autoPlayInterval = 3000,
		pauseOnHover = true
	}: Props = $props();

	// Refs and state
	let container: HTMLDivElement;
	let slideElements: HTMLDivElement[] = [];
	let currentIndex = $state(0);
	let isAnimating = $state(false);
	let isDragging = $state(false);
	let pointerId: number | null = null;
	let startX = $state(0);
	let deltaX = $state(0);
	let containerHeight = $state<number | undefined>();
	let isPausedHover = $state(false);
	let isPausedViewport = $state(false);
	let autoPlayTimer: number | undefined;
	let reduceMotion = false;

	// Keep bindables in sync when index changes
	$effect(() => {
		if (slides.length > 0) {
			const s = slides[currentIndex];
			currentUrl = s?.url;
			currentSlide = s ? { url: s.url, title: s.title } : undefined;
		}
	});

	// Drive currentIndex from inbound currentUrl/currentSlide
	$effect(() => {
		if (slides.length === 0) return;
		if (currentUrl) {
			const idx = slides.findIndex((s) => s.url === currentUrl);
			if (idx !== -1 && idx !== currentIndex) currentIndex = idx;
		}
	});
	$effect(() => {
		if (slides.length === 0) return;
		if (currentSlide) {
			const idx = slides.findIndex((s) => s.url === currentSlide!.url);
			if (idx !== -1 && idx !== currentIndex) currentIndex = idx;
		}
	});

	// Initialize and responsive auto-height
	function updateAutoHeightFor(index: number) {
		if (!autoHeight || !container || slides.length === 0) return;
		const src = slides[index]?.url;
		if (!src) return;
		const img = new Image();
		img.onload = () => {
			const w = container.offsetWidth;
			const ratio = img.naturalHeight / img.naturalWidth || 0;
			containerHeight = w * ratio;
		};
		img.src = src;
	}

	let resizeObserver: ResizeObserver | undefined;
	function observeResize() {
		if (!autoHeight || !container) return;
		resizeObserver?.disconnect();
		resizeObserver = new ResizeObserver(() => updateAutoHeightFor(currentIndex));
		resizeObserver.observe(container);
	}

	// Preload neighbors to avoid flash
	function preloadNeighbors(index: number) {
		const toPreload = [index - 1, index + 1].filter((i) => i >= 0 && i < slides.length);
		toPreload.forEach((i) => {
			const src = slides[i].url;
			const im = new Image();
			im.src = src;
		});
	}

	// Autoplay controls
	function startAutoPlay() {
		if (!autoPlay || slides.length <= 1 || isPausedHover || isPausedViewport) return;
		stopAutoPlay();
		autoPlayTimer = window.setTimeout(() => {
			if (!isDragging && !isAnimating) {
				const next = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
				goToSlide(next, 'left');
			} else {
				// If user interacts, try again a bit later to avoid piling up timers
				startAutoPlay();
			}
		}, autoPlayInterval);
	}
	function stopAutoPlay() {
		if (autoPlayTimer) {
			clearTimeout(autoPlayTimer);
			autoPlayTimer = undefined;
		}
	}
	function pauseOnEnter() {
		if (!pauseOnHover) return;
		isPausedHover = true;
		stopAutoPlay();
	}
	function resumeOnLeave() {
		if (!pauseOnHover) return;
		isPausedHover = false;
		startAutoPlay();
	}

	// Viewport pause using IntersectionObserver
	let io: IntersectionObserver | undefined;
	function observeVisibility() {
		if (!container) return;
		io?.disconnect();
		io = new IntersectionObserver(
			(entries) => {
				const visible = entries.some((e) => e.isIntersecting);
				isPausedViewport = !visible;
				if (visible) startAutoPlay();
				else stopAutoPlay();
			},
			{ threshold: 0.1 }
		);
		io.observe(container);
	}

	// Pointer/drag handling with capture and live drag feedback
	function onPointerDown(e: PointerEvent) {
		if (isAnimating) return;
		isDragging = true;
		pointerId = e.pointerId;
		startX = e.clientX;
		deltaX = 0;
		container.setPointerCapture(pointerId);
		stopAutoPlay();
	}
	function onPointerMove(e: PointerEvent) {
		if (!isDragging || isAnimating) return;
		if (pointerId !== null && e.pointerId !== pointerId) return;
		deltaX = e.clientX - startX;
		const width = container?.offsetWidth || 1;
		const dxPercent = (deltaX / width) * 100;

		const curr = slideElements[currentIndex];
		if (!curr) return;

		// Determine direction and neighbor
		let neighborIndex: number | null = null;
		if (dxPercent < 0 && currentIndex < slides.length - 1) neighborIndex = currentIndex + 1; // dragging left
		if (dxPercent > 0 && currentIndex > 0) neighborIndex = currentIndex - 1; // dragging right

		const neighbor = neighborIndex != null ? slideElements[neighborIndex] : undefined;

		// Position slides for live feedback
		gsap.set(curr, { xPercent: dxPercent });
		if (neighbor) {
			const from = dxPercent < 0 ? 100 : -100; // offscreen side
			gsap.set(neighbor, { display: 'block', xPercent: from + dxPercent, opacity: 1 });
		}
	}
	function onPointerUp(e: PointerEvent) {
		if (!isDragging || isAnimating) return;
		if (pointerId !== null && e.pointerId !== pointerId) return;
		isDragging = false;
		container.releasePointerCapture(pointerId!);

		const width = container?.offsetWidth || 1;
		const thresholdPx = 50; // keep original threshold for compatibility
		const success = Math.abs(deltaX) > thresholdPx;

		if (!success) {
			// Snap back
			const curr = slideElements[currentIndex];
			const duration = reduceMotion ? 0 : 0.25;
			gsap.to(curr, { xPercent: 0, duration, ease: 'power2.out' });

			// Hide any revealed neighbor
			const neighborIndex = deltaX < 0 ? currentIndex + 1 : currentIndex - 1;
			const neighbor = slideElements[neighborIndex];
			if (neighbor)
				gsap.to(neighbor, {
					xPercent: deltaX < 0 ? 100 : -100,
					opacity: 1,
					duration,
					onComplete: () => {
						gsap.set(neighbor, { display: 'none' });
					}
				});

			deltaX = 0;
			startAutoPlay();
			return;
		}

		// Commit to navigation
		if (deltaX < 0 && currentIndex < slides.length - 1) {
			goToSlide(currentIndex + 1, 'left');
		} else if (deltaX > 0 && currentIndex > 0) {
			goToSlide(currentIndex - 1, 'right');
		} else {
			// Edge: nothing to do, snap back
			const curr = slideElements[currentIndex];
			const duration = reduceMotion ? 0 : 0.2;
			gsap.to(curr, { xPercent: 0, duration, ease: 'power2.out' });
			startAutoPlay();
		}
		deltaX = 0;
	}

	// Touch fallback for browsers that may not use PointerEvents consistently
	function onTouchStart(e: TouchEvent) {
		if (isAnimating || e.touches.length === 0) return;
		isDragging = true;
		startX = e.touches[0].clientX;
		deltaX = 0;
		stopAutoPlay();
	}
	function onTouchMove(e: TouchEvent) {
		if (!isDragging || isAnimating || e.touches.length === 0) return;
		deltaX = e.touches[0].clientX - startX;
		const width = container?.offsetWidth || 1;
		const dxPercent = (deltaX / width) * 100;
		const curr = slideElements[currentIndex];
		if (!curr) return;
		let neighborIndex: number | null = null;
		if (dxPercent < 0 && currentIndex < slides.length - 1) neighborIndex = currentIndex + 1;
		if (dxPercent > 0 && currentIndex > 0) neighborIndex = currentIndex - 1;
		const neighbor = neighborIndex != null ? slideElements[neighborIndex] : undefined;
		gsap.set(curr, { xPercent: dxPercent });
		if (neighbor) {
			const from = dxPercent < 0 ? 100 : -100;
			gsap.set(neighbor, { display: 'block', xPercent: from + dxPercent, opacity: 1 });
		}
	}
	function onTouchEnd(e: TouchEvent) {
		if (!isDragging || isAnimating) return;
		isDragging = false;
		const width = container?.offsetWidth || 1;
		const thresholdPx = 50;
		const success = Math.abs(deltaX) > thresholdPx;
		if (!success) {
			const curr = slideElements[currentIndex];
			const duration = reduceMotion ? 0 : 0.25;
			gsap.to(curr, { xPercent: 0, duration, ease: 'power2.out' });
			const neighborIndex = deltaX < 0 ? currentIndex + 1 : currentIndex - 1;
			const neighbor = slideElements[neighborIndex];
			if (neighbor)
				gsap.to(neighbor, {
					xPercent: deltaX < 0 ? 100 : -100,
					opacity: 1,
					duration,
					onComplete: () => {
						gsap.set(neighbor, { display: 'none' });
					}
				});
			deltaX = 0;
			startAutoPlay();
			return;
		}
		if (deltaX < 0 && currentIndex < slides.length - 1) {
			goToSlide(currentIndex + 1, 'left');
		} else if (deltaX > 0 && currentIndex > 0) {
			goToSlide(currentIndex - 1, 'right');
		} else {
			const curr = slideElements[currentIndex];
			const duration = reduceMotion ? 0 : 0.2;
			gsap.to(curr, { xPercent: 0, duration, ease: 'power2.out' });
			startAutoPlay();
		}
		deltaX = 0;
	}

	// Keyboard navigation
	function onKeyDown(e: KeyboardEvent) {
		// Only react when user is interacting with the slider (hovering or dragging)
		if (isAnimating || (!isPausedHover && !isDragging)) return;
		if (e.key === 'ArrowLeft' && currentIndex > 0) {
			e.preventDefault();
			stopAutoPlay();
			goToSlide(currentIndex - 1, 'right');
		} else if (e.key === 'ArrowRight' && currentIndex < slides.length - 1) {
			e.preventDefault();
			stopAutoPlay();
			goToSlide(currentIndex + 1, 'left');
		}
	}

	function goToSlide(newIndex: number, direction: 'left' | 'right') {
		if (isAnimating || newIndex === currentIndex || newIndex < 0 || newIndex >= slides.length)
			return;

		isAnimating = true;
		const curr = slideElements[currentIndex];
		const next = slideElements[newIndex];
		if (!curr || !next) {
			isAnimating = false;
			return;
		}

		// Prepare positions
		const move = direction === 'left' ? 100 : -100;
		gsap.set(next, { xPercent: -move, opacity: 1, display: 'block' });

		const duration = reduceMotion ? 0 : 0.35;
		const tl = gsap.timeline({
			onComplete: () => {
				currentIndex = newIndex;
				isAnimating = false;
				slideElements.forEach((el, i) => {
					if (i !== currentIndex) gsap.set(el, { display: 'none', xPercent: 0, opacity: 0 });
				});
				updateAutoHeightFor(currentIndex);
				preloadNeighbors(currentIndex);
				startAutoPlay();
			}
		});

		tl.to(curr, { xPercent: move, opacity: 0, duration, ease: 'power2.inOut' }, 0).to(
			next,
			{ xPercent: 0, opacity: 1, duration, ease: 'power2.inOut' },
			0
		);
	}

	// Initial positioning whenever slides or refs ready
	$effect(() => {
		if (slideElements.length === slides.length && slides.length > 0) {
			slideElements.forEach((el, i) => {
				if (i === currentIndex) gsap.set(el, { xPercent: 0, opacity: 1, display: 'block' });
				else gsap.set(el, { xPercent: 0, opacity: 0, display: 'none' });
			});
		}
	});

	// Clamp index when slides change
	$effect(() => {
		if (currentIndex >= slides.length) currentIndex = Math.max(0, slides.length - 1);
	});

	onMount(() => {
		reduceMotion =
			typeof window !== 'undefined' &&
			window.matchMedia &&
			window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		// Initialize bindables and autoheight
		if (slides.length > 0) {
			const s = slides[currentIndex];
			currentUrl = s.url;
			currentSlide = { url: s.url, title: s.title };
			updateAutoHeightFor(currentIndex);
			observeResize();
			preloadNeighbors(currentIndex);
		}

		if (autoPlay && slides.length > 1) startAutoPlay();
		observeVisibility();
	});

	onDestroy(() => {
		stopAutoPlay();
		resizeObserver?.disconnect();
		io?.disconnect();
		// Kill any tweens to avoid leaks
		slideElements.forEach((el) => gsap.killTweensOf(el));
	});
</script>

<svelte:window on:keydown={onKeyDown} />

<div
	bind:this={container}
	class="slider-container"
	class:auto-height={autoHeight}
	class:fit-natural-size={fitToNaturalSize}
	style:height={autoHeight && containerHeight ? `${containerHeight}px` : undefined}
	onpointerdown={onPointerDown}
	onpointermove={onPointerMove}
	onpointerup={onPointerUp}
	onpointercancel={onPointerUp}
	ontouchstart={onTouchStart}
	ontouchmove={onTouchMove}
	ontouchend={onTouchEnd}
	onmouseenter={pauseOnEnter}
	onmouseleave={resumeOnLeave}
	role="region"
	aria-roledescription="carousel"
	aria-label="Image slider"
	aria-live="polite"
	style="touch-action: pan-y pinch-zoom;"
>
	{#each slides as slide, index (slide.url)}
		<div
			bind:this={slideElements[index]}
			class="slide"
			role="group"
			aria-roledescription="slide"
			aria-label={slide.title}
			aria-hidden={index !== currentIndex}
		>
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
		touch-action: pan-y pinch-zoom;
		cursor: grab;
		outline: none;
	}
	.slider-container.auto-height {
		height: auto;
	}
	.slider-container:active {
		cursor: grabbing;
	}

	.slide {
		position: absolute;
		inset: 0;
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
