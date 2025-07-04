<script lang="ts">
	import ArrowLeft from '$lib/components/ArrowLeft.svelte';
	import ArrowRight from '$lib/components/ArrowRight.svelte';
	import Content from '$lib/components/Content.svelte';
	import ImageContainer from '$lib/components/ImageContainer.svelte';
	import RoundButton from '$lib/components/RoundButton.svelte';
	import TextStyle3D from '$lib/components/TextStyle3D.svelte';
	import { slide } from 'svelte/transition';
	import type { PageData } from './$types';
	import { quintOut } from 'svelte/easing';
	import { onMount } from 'svelte';
	import PuzzleBoard from '$lib/components/PuzzleBoard.svelte';
	import PieceTray from '$lib/components/PieceTray.svelte';

	const { data }: { data: PageData } = $props();
	interface PuzzlePieceType {
		id: number;
		imageSrc: string;
	}
	const puzzleElements: PuzzlePieceType[] = [
		{ id: 1, imageSrc: '/pzz-owl/1.png' },
		{ id: 2, imageSrc: '/pzz-owl/2.png' },
		{ id: 3, imageSrc: '/pzz-owl/3.png' },
		{ id: 4, imageSrc: '/pzz-owl/4.png' }
	];

	function getNextPuzzle(index: number) {
		const maxLen = puzzleElements.length;
		console.log(maxLen);
		if (index < maxLen) activePuzzleElement++;
		if (index === maxLen) activePuzzleElement--;
		console.log(activePuzzleElement);
	}
	function getPrevPuzzle(index: number) {
		if (index > 0) activePuzzleElement--;
		if (index === 0) activePuzzleElement++;
		console.log(activePuzzleElement);
	}

	let activePuzzleElement = $state<number>(3);
	let selectedPuzzleElement = $derived<string>(puzzleElements[activePuzzleElement].src);
	let buttonElement = $state<HTMLButtonElement>();

	let isDragging = $state<boolean>(false);
	let startX = $state(0);
	let startY = $state(0);
	let currentX = $state(0);
	let currentY = $state(0);
	let originalPosition = $state(null);
	let isPositioned = $state<boolean>(false);

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

	function handleButtonClick() {
		if (!isDragging) {
			console.log('Кнопка нажата!');
		}
	}

	// Функция для сброса позиции (для тестирования)
	function resetPosition() {
		returnToOriginalPosition();
	}

	let contentCotainer = $state();
	let puzzleContainer = $state();
</script>

<Content bind:this={contentCotainer}>
	<PuzzleBoard gridSize={4} pieces={puzzleElements} onDrop={() => console.log('dropped')}
	></PuzzleBoard>
	<PieceTray pieces={puzzleElements}></PieceTray>
</Content>

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
</style>
