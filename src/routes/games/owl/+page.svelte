<script lang="ts">
	import { goto } from '$app/navigation';
	import ArrowLeft from '$lib/components/ArrowLeft.svelte';
	import ArrowRight from '$lib/components/ArrowRight.svelte';
	import Content from '$lib/components/Content.svelte';
	import ImageContainer from '$lib/components/ImageContainer.svelte';
	import RoundButton from '$lib/components/RoundButton.svelte';
	import TextStyle3D from '$lib/components/TextStyle3D.svelte';
	import { PuzzlePathData } from '$lib/data/puzzlePathData';
	import puzzlePiecesData from '$lib/data/puzzles.json';
	import { type PuzzlePieceType } from '$lib/types';
	import gsap from 'gsap';
	import { Draggable } from 'gsap/Draggable';
	import { onMount } from 'svelte';
	import type { Action } from 'svelte/action';
	import { cubicOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import type { PageData } from './$types';

	const boardPuzzlePieces = puzzlePiecesData.puzzleOwlPieces;
	const trayPuzzlePieces = puzzlePiecesData.puzzleOwlPieces;
	const pathes = PuzzlePathData.puzzle22.path;
	const imageHref = PuzzlePathData.puzzle22.image;
	const overlapThreshold = '99%';
	const randomIndex = Math.floor(Math.random() * boardPuzzlePieces.length);
	const randomPieceToPlace = boardPuzzlePieces[randomIndex];
	const placedPieces = new Set<number>();

	let puzzleElementsInTray = $state<PuzzlePieceType[]>(
		trayPuzzlePieces.filter((p) => p.id !== randomPieceToPlace.id)
	);
	let activePuzzleElement = $state<number>(0);
	let buttonActivePuzzleElement = $state<HTMLElement>();
	let prevIndex = $state<number>(0);
	let dropArea = $state<HTMLElement>();

	function getNextPuzzlePiece(index: number) {
		prevIndex = activePuzzleElement;
		const maxLen = puzzleElementsInTray.length - 1;
		activePuzzleElement = index === maxLen ? 0 : index + 1;
	}

	function getPrevPuzzlePiece(index: number) {
		prevIndex = activePuzzleElement;
		activePuzzleElement = index > 0 ? index - 1 : puzzleElementsInTray.length - 1;
	}

	const initDraggableOnMount: Action<HTMLElement> = (node) => {
		setTimeout(() => initDraggable(node), 1000);
	};

	const initDraggable = (node: HTMLElement) => {
		gsap.registerPlugin(Draggable);

		const draggable = Draggable.create(node, {
			type: 'x,y',
			bounds: document.getElementById('content-container'),
			onDragEnd: function () {
				console.debug('drag ended');
				if (placedPieces.size === boardPuzzlePieces.length) {
					console.log('Все элементы размещены! Перенаправление...');
					setTimeout(() => {
						goto('/prizes/owl');
					}, 800); //
				}
			},
			onRelease: function () {
				console.debug('on release');
				if (!this.pointerEvent) return;

				if (dropArea && !this.hitTest(dropArea, overlapThreshold)) {
					gsap.to(node, {
						x: 0,
						y: 0,
						duration: 0.5,
						ease: 'power2.out'
					});
				}

				const draggedEl = this.target as HTMLElement;
				this.target.style.visibility = 'hidden';
				const { clientX, clientY } = this.pointerEvent;
				const dropTarget = document.elementFromPoint(clientX, clientY) as HTMLElement;
				draggedEl.style.visibility = 'visible';

				const dragPuzzleId: number = parseInt(draggedEl.dataset.puzzleId);
				const dropTargetPuzzleId: number = parseInt(dropTarget.dataset.puzzleId);

				if (dropArea && this.hitTest(dropArea, overlapThreshold)) {
					const matchedPiece = boardPuzzlePieces.find(
						(p) => p.placeId === dropTargetPuzzleId && p.id === dragPuzzleId
					);
					if (matchedPiece) {
						const maskPath = document.getElementById(`mask-${dropTargetPuzzleId}`);
						gsap.to(maskPath, {
							delay: 0.2,
							opacity: 0,
							ease: 'power2.out'
						});
						gsap.to(node, {
							scale: 1.5,
							opacity: 0.1,
							ease: 'power2.out',
							onComplete: () => {
								puzzleElementsInTray = puzzleElementsInTray.filter((p) => p.id !== dragPuzzleId);
							}
						});
						this.kill();
						placedPieces.add(dragPuzzleId);
					}
				}
			}
		})[0];
		return {
			destroy() {
				draggable.kill();
			}
		};
	};

	onMount(() => {
		const maskPath = document.getElementById(`mask-${randomPieceToPlace.placeId}`);
		if (maskPath) {
			maskPath.setAttribute('fill', 'black');
		}
		// Добавляем в размещённые
		placedPieces.add(randomPieceToPlace.id);
	});
</script>

<Content>
	<ImageContainer>
		<div
			class="relative w-full aspect-square rounded-4xl overflow-hidden px-2 pt-10 pb-2 gap-6 bg-secondary layer-shadow flex flex-col justify-center items-center"
			bind:this={dropArea}
		>
			<img
				src="/frame.png"
				width="440"
				height="440"
				class="absolute inset-0 w-full h-full object-fill pointer-events-none z-30"
				alt="puzzle board frame"
			/>
			<svg
				width="100%"
				height="100%"
				viewBox="0 0 440 440"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				preserveAspectRatio="xMidYMid meet"
				class="absolute inset-0 w-full h-full rounded-[40px] z-20"
			>
				<defs>
					<filter id="desaturate" color-interpolation-filters="sRGB">
						<feTurbulence id="turbulence" type="turbulence" numOctaves="4" result="NOISE"
						></feTurbulence>
						<feDisplacementMap in="SourceGraphic" in2="NOISE" scale="20"></feDisplacementMap>
						<feGaussianBlur stdDeviation="4" result="BLUR"></feGaussianBlur>
						<feColorMatrix type="saturate" values="0" />
						<animate
							xlink:href="#turbulence"
							attributeName="baseFrequency"
							dur="60s"
							keyTimes="0;0.5;1"
							values="0.01 0.02;0.02 0.04;0.01 0.02"
							repeatCount="indefinite"
						></animate>
					</filter>
					<mask id="puzzleMask">
						{#each pathes as path}
							<path
								fill="white"
								id={'mask-' + path.id.toString()}
								d={path.path}
								data-puzzle-id={path.id}
							/>
						{/each}
					</mask>
				</defs>

				{#if imageHref}
					<image
						href={imageHref}
						x="0"
						y="0"
						width="440"
						height="440"
						style="pointer-events: none"
						mask="url(#puzzleMask)"
						filter="url(#desaturate)"
					/>
				{/if}
				<path
					d="M435.849 222.094C425.629 222.251 414.26 223.525 403.05 224.815C391.145 226.185 379.384 227.58 369.661 227.58C364.794 227.58 360.333 227.232 356.558 226.318C352.795 225.407 349.527 223.887 347.259 221.4C342.538 216.22 343.137 208.156 348.677 197.061C353.898 186.607 352.403 179.308 348.285 174.596C343.999 169.692 336.424 167.052 328.551 167.052C320.677 167.052 313.103 169.692 308.816 174.596C304.698 179.308 303.203 186.607 308.424 197.061C313.961 208.15 314.596 216.207 309.936 221.39C307.695 223.882 304.453 225.405 300.72 226.317C296.975 227.232 292.547 227.58 287.713 227.58C278.057 227.58 266.363 226.185 254.51 224.815C243.343 223.524 232.001 222.25 221.781 222.093C221.623 232.588 220.321 244.162 219.036 255.307C217.657 267.267 216.302 278.7 216.302 288.074C216.302 292.754 216.642 296.817 217.445 300.111C218.251 303.417 219.479 305.765 221.111 307.236C224.178 310 229.869 310.554 240.777 305.093C252.319 299.315 261.518 300.569 267.803 306.076C273.897 311.414 276.756 320.337 276.756 328.961C276.756 337.586 273.897 346.509 267.803 351.847C261.518 357.353 252.319 358.607 240.777 352.829C229.869 347.369 224.178 347.922 221.111 350.687C219.479 352.158 218.251 354.505 217.445 357.811C216.642 361.106 216.302 365.168 216.302 369.849C216.302 379.222 217.657 390.656 219.036 402.616C220.322 413.766 221.624 425.346 221.782 435.845H433.572C434.175 435.845 434.755 435.605 435.182 435.177C435.609 434.75 435.849 434.169 435.849 433.564V222.094ZM110.894 167.052C103.02 167.052 95.4452 169.692 91.1592 174.596C87.041 179.308 85.5459 186.607 90.7668 197.061C96.3043 208.15 96.9386 216.207 92.2792 221.39C90.038 223.883 86.796 225.405 83.0626 226.317C79.3173 227.232 74.8897 227.58 70.0557 227.58C60.3999 227.58 48.7064 226.185 36.8527 224.815C25.6973 223.525 14.367 222.252 4.15591 222.094L4.68614 433.559V433.564C4.68614 434.169 4.92616 434.75 5.35339 435.177C5.78056 435.605 6.35976 435.845 6.96354 435.845H217.63C217.473 425.617 216.201 414.267 214.912 403.092C213.543 391.224 212.151 379.516 212.151 369.849C212.151 365.009 212.498 360.576 213.412 356.826C214.324 353.089 215.843 349.843 218.333 347.599C223.51 342.934 231.559 343.569 242.634 349.114C253.075 354.341 260.364 352.843 265.07 348.72C269.968 344.429 272.605 336.845 272.605 328.961C272.605 321.078 269.968 313.493 265.07 309.202C260.364 305.079 253.075 303.582 242.634 308.809C231.559 314.353 223.51 314.989 218.333 310.323C215.843 308.079 214.323 304.834 213.412 301.096C212.498 297.346 212.151 292.913 212.151 288.074C212.151 278.406 213.543 266.699 214.912 254.83C216.2 243.661 217.471 232.317 217.63 222.094C207.419 222.252 196.089 223.525 184.934 224.815C173.081 226.185 161.387 227.58 151.732 227.58C146.898 227.58 142.47 227.232 138.724 226.317C134.991 225.405 131.749 223.883 129.508 221.39C124.848 216.207 125.483 208.15 131.02 197.061C136.241 186.607 134.746 179.308 130.628 174.596C126.342 169.692 118.767 167.052 110.894 167.052ZM6.96354 4.15486C6.35973 4.15489 5.78054 4.39506 5.35339 4.82272C4.92618 5.25045 4.68614 5.83082 4.68614 6.43598V6.44125L4.15591 217.938C14.6383 218.097 26.1977 219.401 37.329 220.687C49.2746 222.068 60.6938 223.425 70.0557 223.425C74.7304 223.425 78.7878 223.085 82.078 222.281C85.3801 221.474 87.7244 220.244 89.1935 218.61C91.9548 215.539 92.5076 209.84 87.0535 198.919C81.2828 187.363 82.5354 178.153 88.0349 171.86C93.3666 165.76 102.279 162.897 110.894 162.897C119.508 162.897 128.42 165.76 133.752 171.86C139.252 178.153 140.504 187.363 134.733 198.919C129.279 209.84 129.832 215.539 132.593 218.61C134.063 220.244 136.407 221.474 139.709 222.281C142.999 223.085 147.057 223.425 151.732 223.425C161.093 223.425 172.512 222.068 184.458 220.687C195.589 219.401 207.148 218.097 217.63 217.938C217.474 207.706 216.201 196.35 214.912 185.17C213.543 173.302 212.151 161.594 212.151 151.926C212.151 147.087 212.498 142.654 213.412 138.904C214.324 135.166 215.843 131.921 218.333 129.677C223.51 125.011 231.559 125.647 242.634 131.191C253.075 136.418 260.364 134.921 265.07 130.798C269.968 126.507 272.605 118.922 272.605 111.039C272.605 103.155 269.968 95.5709 265.07 91.2796C260.364 87.1567 253.075 85.6594 242.634 90.8864C231.559 96.4307 223.51 97.0663 218.333 92.4007C215.843 90.1567 214.324 86.9112 213.412 83.1735C212.498 79.4238 212.151 74.9909 212.151 70.151C212.151 60.4836 213.543 48.7759 214.912 36.9077C216.201 25.7329 217.473 14.3827 217.63 4.15486H6.96354ZM435.849 6.43598C435.849 5.83086 435.609 5.25047 435.182 4.82272C434.755 4.39504 434.175 4.15491 433.572 4.15486H221.782C221.624 14.6541 220.322 26.2335 219.036 37.384C217.657 49.3442 216.302 60.7775 216.302 70.151C216.302 74.8316 216.642 78.8944 217.445 82.1888C218.251 85.4951 219.479 87.8424 221.111 89.3133C224.178 92.0775 229.869 92.6313 240.777 87.1706C252.319 81.3926 261.518 82.6467 267.803 88.1533C273.897 93.4914 276.756 102.414 276.756 111.039C276.756 119.663 273.897 128.586 267.803 133.924C261.518 139.431 252.319 140.685 240.777 134.907C229.869 129.446 224.178 130 221.111 132.764C219.479 134.235 218.251 136.582 217.445 139.889C216.642 143.183 216.302 147.246 216.302 151.926C216.302 161.3 217.657 172.733 219.036 184.693C220.323 195.849 221.625 207.435 221.782 217.938C232.272 218.094 243.844 219.399 254.986 220.687C266.932 222.068 278.351 223.425 287.713 223.425C292.387 223.425 296.445 223.085 299.735 222.281C303.037 221.474 305.381 220.244 306.85 218.61C309.612 215.539 310.165 209.84 304.71 198.919C298.94 187.363 300.192 178.153 305.692 171.86C311.024 165.76 319.936 162.897 328.551 162.897C337.165 162.897 346.077 165.76 351.409 171.86C356.908 178.153 358.161 187.363 352.39 198.919C346.939 209.834 347.525 215.526 350.326 218.6C351.82 220.239 354.197 221.471 357.534 222.279C360.858 223.085 364.952 223.425 369.661 223.425C379.092 223.425 390.58 222.068 402.576 220.687C413.76 219.4 425.359 218.095 435.849 217.938V6.43598ZM440 433.564C440 435.271 439.323 436.908 438.117 438.115C436.912 439.322 435.277 440 433.572 440H6.96354C5.2584 440 3.62317 439.322 2.41766 438.115C1.21335 436.909 0.536458 435.274 0.535095 433.569L0 220.005L2.06498 220L0 219.995L0.535095 6.43071C0.536464 4.72587 1.21334 3.0909 2.41766 1.88511C3.62319 0.678143 5.25841 2.66083e-05 6.96354 0H433.572C435.277 4.87156e-05 436.912 0.678139 438.117 1.88511C439.323 3.0921 440 4.72925 440 6.43598V433.564Z"
					fill="#711E02"
					id="borders"
				/>
				{#each pathes as path}
					<path
						d={path.path}
						id={'mask-' + path.id}
						data-puzzle-id={path.id}
						fill="white"
						opacity="0"
					/>
				{/each}
			</svg>
			<img
				src="/pzz-owl/cat-owl.png"
				width="440"
				height="440"
				alt="Owl"
				class="absolute inset-0 w-full h-full object-fill pointer-events-none"
			/>
		</div>

		<p class="text-center">
			<TextStyle3D className={'text-2xl'}>Собери элементы пазла</TextStyle3D>
		</p>
	</ImageContainer>

	<div
		class="grid grid-cols-[auto_1fr_auto] w-full items-center justify-items-center h-[150px] my-auto"
	>
		<RoundButton onclick={() => getPrevPuzzlePiece(activePuzzleElement)}><ArrowLeft /></RoundButton>

		<div class="relative flex justify-center items-center w-full h-full">
			{#each puzzleElementsInTray as elem, i (elem.id)}
				{#if i === activePuzzleElement}
					{@const btnId = 'pzl-' + elem.id.toString()}
					<button
						bind:this={buttonActivePuzzleElement}
						use:initDraggableOnMount
						id={btnId}
						data-puzzle-id={elem.id}
						class="draggable"
						class:inactive={false}
						onintroend={(event) => initDraggableOnMount(event.currentTarget)}
						in:fly={{
							x: prevIndex < activePuzzleElement ? 100 : -100,
							duration: 300,
							easing: cubicOut
						}}
						out:fly={{
							x: prevIndex < activePuzzleElement ? -100 : 100,
							duration: 300,
							easing: cubicOut
						}}
					>
						<img
							src={elem.imageSrc}
							alt="puzzle"
							class="natural-size-image drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)] pointer-events-none"
							data-puzzle-id={elem.id}
						/>
					</button>
				{/if}
			{/each}
		</div>
		<RoundButton onclick={() => getNextPuzzlePiece(activePuzzleElement)}><ArrowRight /></RoundButton
		>
	</div>
</Content>

<style>
	.inactive {
		filter: saturate(0);
		opacity: 0.5;
	}

	.inactive .drop-shadow-\[0_2px_4px_rgba\(0\,0\,0\,0\.25\)\] {
		filter: none !important;
	}

	.natural-size-image {
		/* Сохранение натурального размера */
		width: auto;
		height: auto;
		max-width: none;
		max-height: none;
		display: block;
	}
</style>
