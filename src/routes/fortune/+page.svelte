<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Content from '$lib/components/Content.svelte';
	import ImageContainer from '$lib/components/ImageContainer.svelte';
	import UserProfileHeader from '$lib/components/UserProfileHeader.svelte';
	import gsap from 'gsap';
	import type { PageData } from './$types';
	import { getRandomInteger } from '$lib/utils';

	const { data }: { data: PageData } = $props();
	let showPop = $state(false);
	let wheelElem = $state<HTMLElement>();
	function spinWheel(e: HTMLElement) {
		gsap.to(e, {
			rotate: '+=720',
			duration: 1.5 * getRandomInteger(1, 3)
		});
	}
</script>

<Content className="gap-8">
	<ImageContainer>
		<UserProfileHeader />
	</ImageContainer>

	<div class="relative">
		<img
			src="/wheel/arrow.png"
			alt="spin wheel arrow"
			class="absolute top-0 left-1/2 -translate-x-1/2 z-20"
		/>
		<div class="cursor-pointer" style:width="346px" style:height="346px">
			<img
				src="/wheel/red-ball.png"
				alt=""
				srcset=""
				class="absolute top-1/2 left-1/2 -translate-1/2 z-15"
			/>
			<img
				src="/wheel/inner-circle.png"
				alt="spin wheel"
				bind:this={wheelElem}
				id="wheel"
				class="absolute top-12 left-12 z-10"
			/>
			<img src="/wheel/outer-circle.png" alt="spin wheel" width="346px" height="346px" />
		</div>
	</div>
	<div class="flex justify-between items-center">
		<Button onClick={() => spinWheel(wheelElem)} title="Крутить">Крутить</Button>
	</div>
</Content>
