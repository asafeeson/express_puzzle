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
	import type { Action } from 'svelte/action';
	import { cubicOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	const boardPuzzlePieces = puzzlePiecesData.puzzleChePieces;
	const pathes = PuzzlePathData.puzzle33.path;
	const imageHref = PuzzlePathData.puzzle33.image;
	const overlapThreshold = '99%';
	const placedPieces = new Set<number>();
	let initialTimeout = 600;

	let puzzleElementsInTray = $state<PuzzlePieceType[]>(puzzlePiecesData.puzzleChePieces);
	let activePuzzleElement = $state<number>(0);
	let buttonActivePuzzleElement = $state<HTMLElement>();
	let prevIndex = $state<number>(0);
	let dropArea = $state<HTMLElement>();
	let isDragging = $state<boolean>(false);

	function getNextPuzzlePiece(index: number) {
		isDragging = false;
		prevIndex = activePuzzleElement;
		const maxLen = puzzleElementsInTray.length - 1;
		activePuzzleElement = index === maxLen ? 0 : index + 1;
		// initDraggable(buttonActivePuzzleElement);
	}

	function getPrevPuzzlePiece(index: number) {
		isDragging = false;
		prevIndex = activePuzzleElement;
		activePuzzleElement = index > 0 ? index - 1 : puzzleElementsInTray.length - 1;
		// initDraggable(buttonActivePuzzleElement);
	}

	const initDraggableOnMount: Action<HTMLElement> = (node) => {
		setTimeout(() => initDraggable(node), initialTimeout);
		initialTimeout = 300;
	};

	const initDraggable = (node: HTMLElement) => {
		gsap.registerPlugin(Draggable);

		const draggable = Draggable.create(node, {
			trigger: node,
			type: 'x,y',
			bounds: document.getElementById('content-container'),
			onDragStart: function () {
				isDragging = true;
			},
			onDragEnd: function () {
				console.debug('drag ended');
				if (placedPieces.size === boardPuzzlePieces.length) {
					console.log('Все элементы размещены! Перенаправление...');
					setTimeout(() => {
						goto('/prizes/che');
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
				console.log('piece:', dragPuzzleId, 'target:', dropTargetPuzzleId);

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
						// this.kill();
						placedPieces.add(dragPuzzleId);
					}
				}
				isDragging = false;
			}
		})[0];
		return {
			destroy() {
				draggable.kill();
			}
		};
	};

	function onIntroEndHandle(event) {
		if (!isDragging) {
			initDraggable(event.currentTarget);
		}
	}
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
					d="M1 147.674C30.326 147.674 74.326 162.326 59.674 133C45 103.674 103.674 103.674 89 133C74.326 162.326 118.326 147.674 147.674 147.674M147.674 147.674C177 147.674 221 162.326 206.326 133C191.674 103.674 250.326 103.674 235.674 133C221 162.326 265 147.674 294.326 147.674M147.674 147.674C147.674 118.326 133 74.326 162.326 89C191.674 103.674 191.674 45 162.326 59.674C133 74.326 147.674 30.326 147.674 1M147.674 147.674C147.674 177 133 221 162.326 206.326C191.674 191.674 191.674 250.326 162.326 235.674C133 221 147.674 265 147.674 294.326M294.326 147.674C323.674 147.674 367.674 133 353 162.326C338.326 191.674 397 191.674 382.326 162.326C367.674 133 411.674 147.674 441 147.674M294.326 147.674C294.326 118.326 279.674 74.326 309 89C338.326 103.674 338.326 45 309 59.674C279.674 74.326 294.326 30.326 294.326 1M294.326 147.674C294.326 177 279.674 221 309 206.326C338.326 191.674 338.326 250.326 309 235.674C279.674 221 294.326 265 294.326 294.326M1 294.326C30.326 294.326 74.326 279.674 59.674 309C45 338.326 103.674 338.326 89 309C74.326 279.674 118.326 294.326 147.674 294.326M147.674 294.326C177 294.326 221 309 206.326 279.674C191.674 250.326 250.326 250.326 235.674 279.674C221 309 265 294.326 294.326 294.326M147.674 294.326C147.674 323.674 133 367.674 162.326 353C191.674 338.326 191.674 397 162.326 382.326C133 367.674 147.674 411.674 147.674 441M294.326 294.326C323.674 294.326 367.674 279.674 353 309C338.326 338.326 397 338.326 382.326 309C367.674 279.674 411.674 294.326 441 294.326M294.326 294.326C294.326 323.674 309 367.674 279.674 353C250.326 338.326 250.326 397 279.674 382.326C309 367.674 294.326 411.674 294.326 441"
					stroke="#711E02"
					stroke-width="4"
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
				src={imageHref}
				width="440"
				height="440"
				alt="Che"
				class="absolute inset-0 w-full h-full object-fill pointer-events-none"
			/>
		</div>

		<p class="text-center">
			<TextStyle3D className={'text-[25px] uppercase'}>СОБЕРИ ПАЗЛ</TextStyle3D>
		</p>
	</ImageContainer>

	<div
		class="grid grid-cols-[auto_1fr_auto] w-full items-center justify-items-center h-[150px] my-auto"
	>
		<RoundButton onclick={() => getPrevPuzzlePiece(activePuzzleElement)}><ArrowLeft /></RoundButton>

		<div class="flex justify-center items-center w-full h-full">
			{#key puzzleElementsInTray}
				{#each puzzleElementsInTray as elem, i (elem.id)}
					{#if i === activePuzzleElement}
						{@const btnId = 'pzl-' + elem.id.toString()}
						<button
							bind:this={buttonActivePuzzleElement}
							{@attach initDraggableOnMount}
							id={btnId}
							data-puzzle-id={elem.id}
							in:fly={{
								x: prevIndex < activePuzzleElement ? 100 : -100,
								duration: 200,
								easing: cubicOut
							}}
							out:fly={{
								x: prevIndex < activePuzzleElement ? -100 : 100,
								duration: 200,
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
			{/key}
		</div>
		<RoundButton onclick={() => getNextPuzzlePiece(activePuzzleElement)}><ArrowRight /></RoundButton
		>
	</div>
</Content>

<style>
	.natural-size-image {
		/* Сохранение натурального размера */
		width: auto;
		height: auto;
		max-width: none;
		max-height: none;
		display: block;
	}
</style>
