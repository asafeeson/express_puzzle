<script lang="ts">
	import wheelArrowPNG from '$lib/assets/wheel/arrow.png';
	import wheelInnerCirclePNG from '$lib/assets/wheel/inner-circle.png';
	import wheelOuterCirclePNG from '$lib/assets/wheel/outer-circle.png';
	import redBallPNG from '$lib/assets/wheel/red-ball.png';
	import Button from '$lib/components/Button.svelte';
	import Content from '$lib/components/Content.svelte';
	import Link from '$lib/components/Link.svelte';
	import SliderWithPartners from '$lib/components/SliderWithPartners.svelte';
	import TextStyle3D from '$lib/components/TextStyle3D.svelte';
	import slidesData from '$lib/data/prizesSliderData';
	import { getRandomInteger } from '$lib/utils';
	import gsap from 'gsap';
	import { quintOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	let showPop = $state(false);
	let wheelElem = $state<HTMLElement>();
	let arrowElem = $state<HTMLElement>();
	function spinWheel(e: HTMLElement | undefined) {
		if (!e) return;
		gsap.to(e, {
			rotate: '+=720',
			duration: 1.5 * getRandomInteger(1, 3),
			onComplete: () => {
				showPop = !showPop;
			}
		});
		getRandomSlide();
	}
	let currentSlide = $state<{ url: string; title: string }>({ url: '', title: 'Заглушка' });

	function getRandomSlide() {
		const randomIndex = getRandomInteger(0, slidesData.length - 1);
		currentSlide = slidesData[randomIndex];
	}

	$effect(() => {
		if (!arrowElem) return;
		const tween = gsap.to(arrowElem, {
			y: 10,
			duration: 0.7,
			ease: 'sine.inOut',
			repeat: -1,
			yoyo: true
		});
		return () => tween.kill();
	});
</script>

<Content>
	<div class:opacity-0={showPop} class="transition-opacity duration-500 w-full">
		<SliderWithPartners autoPlay={!showPop} />
	</div>
	<div class="relative mt-4">
		<img
			src={wheelArrowPNG}
			alt="Fortune Wheel Arrow"
			width="56px"
			class="absolute -top-7 left-1/2 -translate-x-1/2 z-20"
			bind:this={arrowElem}
		/>
		<div class="relative cursor-pointer" style:width="326px" style:height="326px">
			<img
				src={redBallPNG}
				alt="Red Ball"
				class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-15"
			/>
			<img
				src={wheelInnerCirclePNG}
				alt="Fortune Wheel"
				bind:this={wheelElem}
				id="wheel"
				width="234"
				height="234"
				class="absolute top-[45px] left-[46px] z-10 aspect-square"
			/>
			<img src={wheelOuterCirclePNG} alt="spin wheel" width="326" height="326" />
		</div>
	</div>
	<Button onClick={() => spinWheel(wheelElem)} title="Крутить">Крутить</Button>
</Content>

{#if showPop}
	<div
		class="w-dvw h-dvh fixed bottom-0 right-0 z-50 flex flex-col justify-end px-4"
		role="button"
		tabindex="0"
		onclick={() => (showPop = false)}
		onkeypress={(e) => {
			if (e.key === 'Escape' || e.key === ' ') showPop = false;
		}}
		transition:fly={{ delay: 500, duration: 500, y: 500, opacity: 0.5, easing: quintOut }}
	>
		<aside
			class="bg-white/90 py-16 px-3 flex flex-col justify-between items-center rounded-t-2xl gap-10 h-3/4"
		>
			<div class="flex flex-col gap-10 justify-start items-center">
				<h1 class="text-center">
					<TextStyle3D className={'text-4xl'}>Ваш приз:</TextStyle3D>
				</h1>
				<img src={currentSlide.url} alt={currentSlide.title} srcset="" />
				<p>Промокод:128746<br />на блаблабла</p>
			</div>
			<Link href="/" title="забрать приз">Забрать приз</Link>
		</aside>
	</div>
{/if}
