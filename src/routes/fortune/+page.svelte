<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Content from '$lib/components/Content.svelte';
	import ImageContainer from '$lib/components/ImageContainer.svelte';
	import UserProfileHeader from '$lib/components/UserProfileHeader.svelte';
	import gsap from 'gsap';
	import type { PageData } from './$types';
	import { getRandomInteger } from '$lib/utils';
	import TextStyle3D from '$lib/components/TextStyle3D.svelte';
	import Link from '$lib/components/Link.svelte';

	const { data }: { data: PageData } = $props();
	let showPop = $state(true);
	let wheelElem = $state<HTMLElement>();
	function spinWheel(e: HTMLElement) {
		gsap.to(e, {
			rotate: '+=720',
			duration: 1.5 * getRandomInteger(1, 3),
			onComplete: () => {
				showPop = !showPop;
			}
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

{#if showPop}
	<button
		class="w-full h-full absolute z-50 flex flex-col justify-end px-4"
		onclick={() => (showPop = false)}
	>
		<aside
			class="bg-white/90 py-16 px-3 flex flex-col justify-between items-center rounded-t-2xl gap-10"
		>
			<div class="flex flex-col gap-10 justify-start items-center">
				<h1 class="text-center">
					<TextStyle3D className={'text-4xl'}>Вы выиграли!</TextStyle3D>
				</h1>
				<p>Описания приза</p>
			</div>
			<Link href="/" title="забрать приз">Забрать приз</Link>
		</aside>
	</button>
{/if}
