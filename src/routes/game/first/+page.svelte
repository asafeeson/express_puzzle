<script lang="ts">
	import ArrowLeft from '$lib/components/ArrowLeft.svelte';
	import ArrowRight from '$lib/components/ArrowRight.svelte';
	import Content from '$lib/components/Content.svelte';
	import ImageContainer from '$lib/components/ImageContainer.svelte';
	import PuzzleBoard from '$lib/components/PuzzleBoard.svelte';
	import RoundButton from '$lib/components/RoundButton.svelte';
	import TextStyle3D from '$lib/components/TextStyle3D.svelte';
	import { type PuzzlePieceType } from '$lib/types';
	import { onMount } from 'svelte';
	import { quintOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';
	import type { PageData } from './$types';
	import puzzlePiecesData from '$lib/data/puzzles.json';

	const { data }: { data: PageData } = $props();

	const puzzleElements = $state<PuzzlePieceType[]>(puzzlePiecesData.puzzleOwlPieces);

	let contentCotainer = $state();
	let puzzleContainer = $state();
	let placedPieces = $state<(PuzzlePieceType | null)[]>(Array(4).fill(null));
	let activePuzzleElement = $state<number>(0);
	let selectedPuzzleElement = $derived<string>(puzzleElements[activePuzzleElement].imageSrc);
	let buttonElement = $state<HTMLButtonElement>();
	let isDragging = $state<boolean>(false);
	let startX = $state(0);
	let startY = $state(0);
	let currentX = $state(0);
	let currentY = $state(0);
	let originalPosition = $state(null);
	let isPositioned = $state<boolean>(false);

	function getNextPuzzle(index: number) {
		const maxLen = puzzleElements.length - 1;
		activePuzzleElement = index === maxLen ? 0 : index + 1;
	}
	function getPrevPuzzle(index: number) {
		activePuzzleElement = index > 0 ? index - 1 : puzzleElements.length - 1;
	}

	function handlePieceDrop(dropZoneId: number, pieceId: number) {
		const pieceToPlace = puzzleElements.find((p) => p.id === pieceId);
		console.log('pieceToPlace', pieceToPlace);
		if (pieceToPlace) {
			placedPieces[dropZoneId] = pieceToPlace;
			// Optionally remove from the tray if you implement a tray
			console.log(`Piece ${pieceId} dropped into zone ${dropZoneId}`);
		}
	}

	onMount(() => {
		// Сохраняем исходную позицию элемента в потоке документа
		const rect = buttonElement.getBoundingClientRect();
		originalPosition = {
			x: rect.left,
			y: rect.top
		};
	});

	function handlePointerDown(e) {
		isDragging = true;

		// Получаем координаты для мыши и тач-событий
		const clientX = e.clientX || (e.touches && e.touches[0].clientX);
		const clientY = e.clientY || (e.touches && e.touches[0].clientY);

		// Если элемент еще не позиционирован абсолютно, делаем это
		if (!isPositioned) {
			const rect = buttonElement.getBoundingClientRect();
			currentX = rect.left;
			currentY = rect.top;

			// Переводим элемент в absolute позиционирование
			buttonElement.style.position = 'absolute';
			buttonElement.style.left = `${currentX}px`;
			buttonElement.style.top = `${currentY}px`;
			buttonElement.style.margin = '0';
			buttonElement.style.zIndex = '1000';

			isPositioned = true;
		}

		// Запоминаем начальные координаты
		startX = clientX - currentX;
		startY = clientY - currentY;

		// Добавляем обработчики событий на документ
		document.addEventListener('mousemove', handlePointerMove);
		document.addEventListener('mouseup', handlePointerUp);
		document.addEventListener('touchmove', handlePointerMove, { passive: false });
		document.addEventListener('touchend', handlePointerUp);

		// Предотвращаем выделение текста и стандартное поведение
		e.preventDefault();
	}

	function handlePointerMove(e) {
		if (!isDragging) return;

		e.preventDefault();

		// Получаем координаты для мыши и тач-событий
		const clientX = e.clientX || (e.touches && e.touches[0].clientX);
		const clientY = e.clientY || (e.touches && e.touches[0].clientY);

		// Вычисляем новые координаты
		const newX = clientX - startX;
		const newY = clientY - startY;

		// Обновляем позицию кнопки
		currentX = newX;
		currentY = newY;

		buttonElement.style.left = `${currentX}px`;
		buttonElement.style.top = `${currentY}px`;
	}

	function handlePointerUp() {
		isDragging = false;

		// Получаем координаты puzzle контейнера
		const puzzleRect = puzzleContainer.getBoundingClientRect();
		const buttonRect = buttonElement.getBoundingClientRect();

		// Проверяем, находится ли кнопка в пределах puzzle контейнера
		const isInsidePuzzleZone =
			buttonRect.left >= puzzleRect.left &&
			buttonRect.right <= puzzleRect.right &&
			buttonRect.top >= puzzleRect.top &&
			buttonRect.bottom <= puzzleRect.bottom;

		if (isInsidePuzzleZone) {
			// Элемент попал в разрешенную зону - можно оставить его там
			console.log('Элемент размещен в puzzle зоне!');
			// Можно добавить дополнительную логику для "защелкивания"
			const placedPieceId = puzzleElements[activePuzzleElement].id;
			handlePieceDrop(0, placedPieceId); // Assuming dropZoneId 0 for now
			// Удаляем элемент из списка puzzleElements
			puzzleElements.splice(activePuzzleElement, 1);
			// Если список не пуст, корректируем activePuzzleElement
			if (puzzleElements.length > 0) {
				activePuzzleElement = Math.min(activePuzzleElement, puzzleElements.length - 1);
				selectedPuzzleElement = puzzleElements[activePuzzleElement].imageSrc;
			} else {
				// Все элементы размещены, можно скрыть кнопку или показать сообщение
				selectedPuzzleElement = ''; // Или другой индикатор
			}
			returnToOriginalPosition();
		} else {
			// Возвращаем элемент в исходное положение
			returnToOriginalPosition();
		}

		// Удаляем все обработчики событий
		document.removeEventListener('mousemove', handlePointerMove);
		document.removeEventListener('mouseup', handlePointerUp);
		document.removeEventListener('touchmove', handlePointerMove);
		document.removeEventListener('touchend', handlePointerUp);
	}

	function returnToOriginalPosition() {
		// Возвращаем элемент в исходную позицию с анимацией
		buttonElement.style.transition = 'all 0.4s ease-in-out';
		buttonElement.style.left = `${originalPosition.x}px`;
		buttonElement.style.top = `${originalPosition.y}px`;

		// После завершения анимации возвращаем элемент в поток документа
		setTimeout(() => {
			buttonElement.style.position = '';
			buttonElement.style.left = '';
			buttonElement.style.top = '';
			buttonElement.style.margin = '';
			buttonElement.style.zIndex = '';
			buttonElement.style.transition = '';
			isPositioned = false;

			// Обновляем сохраненную позицию
			const rect = buttonElement.getBoundingClientRect();
			originalPosition = {
				x: rect.left,
				y: rect.top
			};
		}, 400);
	}

	function handleDragStart(e: DragEvent) {
		if (e.dataTransfer && e.currentTarget instanceof HTMLElement) {
			e.dataTransfer.setData('pieceId', piece.id.toString());
			e.currentTarget.style.opacity = '0.5';
		}
	}

	function handleButtonClick() {
		if (!isDragging) {
			console.log('Кнопка нажата!');
		}
	}

	// Функция для сброса позиции (для тестирования)
	function resetPosition() {
		returnToOriginalPosition();
	}

	let isSlideLeft = $state<boolean>(true);
	let isSlideRight = $state<boolean>(true);
</script>

<div bind:this={contentCotainer}>
	<Content>
		<div bind:this={puzzleContainer}>
			<ImageContainer>
				<PuzzleBoard
					gridSize={puzzleElements.length}
					pieces={puzzleElements}
					onDrop={handlePieceDrop}
				></PuzzleBoard>
				<p class="text-center">
					<TextStyle3D className={'text-2xl'}>Собери элементы пазла</TextStyle3D>
				</p>
			</ImageContainer>
		</div>
		<div class="flex justify-between items-center w-full h-full">
			<RoundButton onclick={() => getPrevPuzzle(activePuzzleElement)}><ArrowLeft /></RoundButton>
			<div class="flex justify-center items-center w-full grow overflow-hidden">
				{#key activePuzzleElement}
					<button
						bind:this={buttonElement}
						class="draggable-button h-[106px] slide-in-left"
						class:dragging={isDragging}
						onmousedown={handlePointerDown}
						ontouchstart={handlePointerDown}
						onclick={handleButtonClick}
						ondragstart={handleDragStart}
					>
						<img
							src={selectedPuzzleElement}
							alt=""
							class="drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)] w-full h-full object-cover"
						/>
					</button>
				{/key}
			</div>
			<RoundButton onclick={() => getNextPuzzle(activePuzzleElement)}><ArrowRight /></RoundButton>
		</div>
		<!-- <button class="reset-button" onclick={resetPosition}>Сбросить позицию</button> -->
		<!-- <a class="uppercase text-center" href="/prizes/first">далее</a> -->
	</Content>
</div>

<style>
	.draggable-button {
		position: absolute; /* ОБЯЗАТЕЛЬНО - позволяет позиционировать через left/top */
		touch-action: none; /* Отключает стандартные тач-жесты браузера */
		user-select: none; /* Предотвращает выделение текста при перетаскивании */
		cursor: move; /* Показывает, что элемент можно перетаскивать */
		z-index: 10; /* Гарантирует, что кнопка над другими элементами */
		-webkit-touch-callout: none; /* Отключает контекстное меню на iOS */
		-webkit-user-select: none; /* Дополнительная защита от выделения на iOS */
	}
	.draggable-button.dragging {
		transform: scale(1.05);
		filter: drop-shadow(8px 16px 10px rgba(0, 0, 0, 0.3));
		-webkit-filter: drop-shadow(8px 16px 10px rgba(0, 0, 0, 0.3));
		cursor: grabbing;
	}

	.slide-in-left {
		-webkit-animation: slide-in-left 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
		animation: slide-in-left 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
	}

	@-webkit-keyframes slide-in-left {
		0% {
			-webkit-transform: translateX(-1000px);
			transform: translateX(-1000px);
			opacity: 0;
		}
		100% {
			-webkit-transform: translateX(0);
			transform: translateX(0);
			opacity: 1;
		}
	}
	@keyframes slide-in-left {
		0% {
			-webkit-transform: translateX(-1000px);
			transform: translateX(-1000px);
			opacity: 0;
		}
		100% {
			-webkit-transform: translateX(0);
			transform: translateX(0);
			opacity: 1;
		}
	}
</style>
