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
	import PuzzleSvg from '$lib/components/PuzzleSVG.svelte';
	import { passive } from 'svelte/legacy';

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

	function handlePointerDown(e) {
		isDragging = true;

		const target = e.target.classList.add('dragging');

		puzzleElements[activePuzzleElement].isDragging = isDragging;
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
		puzzleElements[activePuzzleElement].isDragging = isDragging;

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

	function handlePointerUp(e) {
		isDragging = false;
		puzzleElements[activePuzzleElement].isDragging = isDragging;
		const target = e.target.classList.remove('dragging');

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
			// const placedPieceId = puzzleElements[activePuzzleElement].id;
			// handlePieceDrop(0, placedPieceId); // Assuming dropZoneId 0 for now
			// Удаляем элемент из списка puzzleElements
			// puzzleElements.splice(activePuzzleElement, 1);
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

	function handleDragStart(e: DragEvent, pieceId: number) {
		console.log('Drag start (e.currentTarget):', e.currentTarget);
		if (e.dataTransfer && e.currentTarget instanceof HTMLElement) {
			e.dataTransfer.setData('pieceId', pieceId.toString());
			e.currentTarget.style.opacity = '0.5';
			console.log('datatransef:', e.dataTransfer.getData('pieceId'));
		}
	}
	function handleDragEnd(e: DragEvent) {
		if (e.currentTarget instanceof HTMLElement) {
			e.currentTarget.style.opacity = '1';
		}
	}
	function handleDrop(e: DragEvent) {
		e.preventDefault();
		const data = e.dataTransfer?.getData('pieceId');
		console.log('Dropped data:', data);
	}
	function handleDragOver(e: DragEvent): void {
		e.preventDefault();
	}

	let selectedDraggable = $state<HTMLElement | null>();
	let shiftX = $state<number>(0);
	let shiftY = $state<number>(0);

	function getCoords(e: MouseEvent | TouchEvent) {
		if (e instanceof TouchEvent) {
			return {
				x: e.touches[0].clientX,
				y: e.touches[0].clientY
			};
		} else {
			return {
				x: e.clientX,
				y: e.clientY
			};
		}
	}

	function startDrag(e: MouseEvent | TouchEvent) {
		const target: HTMLElement | null = (e.target as HTMLElement)?.closest('.draggable');
		if (!target) return;
		e.preventDefault();
		selectedDraggable = target;

		const rect = selectedDraggable.getBoundingClientRect();
		selectedDraggable.style.position = 'absolute';
		selectedDraggable.style.left = rect.left + 'px';
		selectedDraggable.style.top = rect.top + 'px';
		selectedDraggable.classList.add('dragging');

		const coords = getCoords(e);
		shiftX = coords.x - rect.left;
		shiftY = coords.y - rect.top;
		console.log('coords', coords);
		console.log('shiftX, shiftY', shiftX, shiftY);

		document.addEventListener('mousemove', onMove);
		document.addEventListener('mouseup', stopDrag);
		document.addEventListener('touchmove', onMove, { passive: false });
		document.addEventListener('touchend', stopDrag);
	}

	function onMove(e: MouseEvent | TouchEvent) {
		if (!selectedDraggable) return;

		const coords = getCoords(e);
		selectedDraggable.style.left = coords.x - shiftX + 'px';
		selectedDraggable.style.top = coords.y - shiftY + 'px';
	}

	function stopDrag() {
		selectedDraggable.classList.remove('dragging');
		selectedDraggable = null;
		document.removeEventListener('mousemove', onMove);
		document.removeEventListener('mouseup', stopDrag);
		document.removeEventListener('touchmove', onMove);
		document.removeEventListener('touchend', stopDrag);
	}

	onMount(() => {
		document.addEventListener('mousedown', startDrag);
		document.addEventListener('touchstart', startDrag, { passive: false });
	});
</script>

<div bind:this={contentCotainer}>
	<Content>
		<div class="relative w-full my-4 p-2 h-fit">
			<svg
				width="358"
				height="358"
				viewBox="0 0 358 358"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				ondragover={handleDragOver}
				ondrop={handleDrop}
				ontouchend={handleTouchEnd}
				role="application"
				class="w-full"
			>
				<path
					d="M354.622 197.799C354.622 188.308 346.845 180.732 337.403 181.701C334.261 182.024 331.091 182.385 327.936 182.748C318.249 183.862 308.68 184.995 300.769 184.995C296.809 184.995 293.18 184.713 290.108 183.97C287.046 183.229 284.387 181.994 282.542 179.972C278.701 175.761 279.188 169.206 283.696 160.187C287.944 151.689 286.727 145.756 283.376 141.925C279.889 137.939 273.726 135.793 267.32 135.793C260.914 135.793 254.751 137.939 251.264 141.925C247.913 145.756 246.696 151.689 250.944 160.187C255.45 169.201 255.966 175.751 252.175 179.964C250.351 181.99 247.714 183.227 244.676 183.969C241.629 184.713 238.026 184.995 234.093 184.995C226.236 184.995 216.722 183.862 207.078 182.748C203.857 182.376 200.618 182.006 197.408 181.677C188.067 180.72 180.272 188.154 179.323 197.496C178.983 200.849 178.598 204.215 178.215 207.534C177.093 217.257 175.99 226.55 175.99 234.17C175.99 237.975 176.267 241.277 176.92 243.955C177.576 246.643 178.575 248.551 179.903 249.747C182.398 251.994 187.029 252.444 195.904 248.005C205.295 243.308 212.78 244.328 217.894 248.804C222.852 253.143 225.178 260.397 225.178 267.407C225.178 274.418 222.852 281.671 217.894 286.011C212.78 290.487 205.295 291.506 195.904 286.809C187.029 282.37 182.398 282.821 179.903 285.068C178.575 286.263 177.576 288.171 176.92 290.859C176.267 293.537 175.99 296.84 175.99 300.644C175.99 308.264 177.093 317.558 178.215 327.28C178.608 330.688 179.004 334.145 179.35 337.586C180.282 346.829 187.906 354.292 197.196 354.292H352.769C353.26 354.292 353.731 354.097 354.079 353.749C354.427 353.401 354.622 352.929 354.622 352.438V197.799Z"
					fill="white"
					id="0"
				/>
				<path
					d="M90.2266 135.793C83.8206 135.793 77.6571 137.939 74.1699 141.925C70.8192 145.756 69.6027 151.689 73.8506 160.187C78.3561 169.201 78.8722 175.751 75.0812 179.964C73.2576 181.99 70.6198 183.227 67.5822 183.969C64.5349 184.713 60.9324 184.995 56.9994 184.995C49.1431 184.995 39.6288 183.862 29.9841 182.748C26.8735 182.389 23.7462 182.031 20.6446 181.711C11.1861 180.734 3.40044 188.336 3.4243 197.845L3.81227 352.433V352.438C3.81227 352.929 4.00757 353.401 4.35517 353.749C4.70274 354.097 5.17399 354.292 5.66525 354.292H159.808C169.299 354.292 176.876 346.514 175.903 337.073C175.581 333.95 175.221 330.8 174.86 327.667C173.746 318.02 172.613 308.503 172.613 300.644C172.613 296.71 172.896 293.107 173.639 290.059C174.381 287.02 175.617 284.382 177.643 282.558C181.855 278.765 188.404 279.282 197.415 283.789C205.91 288.038 211.841 286.821 215.67 283.469C219.655 279.981 221.801 273.815 221.801 267.407C221.801 260.999 219.655 254.834 215.67 251.345C211.841 247.994 205.91 246.777 197.415 251.026C188.404 255.533 181.855 256.049 177.643 252.257C175.617 250.433 174.381 247.794 173.639 244.756C172.895 241.708 172.613 238.104 172.613 234.17C172.613 226.312 173.746 216.795 174.86 207.147C175.21 204.109 175.56 201.055 175.874 198.025C176.863 188.481 169.126 180.744 159.582 181.734C156.555 182.048 153.504 182.397 150.469 182.748C140.824 183.862 131.31 184.995 123.454 184.995C119.521 184.995 115.918 184.713 112.871 183.969C109.833 183.227 107.195 181.99 105.372 179.964C101.581 175.751 102.097 169.201 106.602 160.187C110.85 151.689 109.634 145.756 106.283 141.925C102.796 137.939 96.6324 135.793 90.2266 135.793Z"
					fill="white"
					id="1"
				/>
				<path
					d="M5.66525 3.375C5.17397 3.37502 4.70272 3.57025 4.35517 3.9179C4.00758 4.26559 3.81227 4.73736 3.81227 5.22929V5.23358L3.42298 160.37C3.39963 169.675 10.8684 177.326 20.1265 178.262C23.5476 178.607 26.984 179 30.3717 179.392C40.0911 180.514 49.3821 181.617 56.9994 181.617C60.8028 181.617 64.1041 181.341 66.7811 180.687C69.4678 180.031 71.3752 179.032 72.5705 177.703C74.8173 175.207 75.267 170.574 70.8294 161.696C66.1341 152.303 67.1532 144.816 71.6279 139.701C75.966 134.742 83.2177 132.415 90.2266 132.415C97.2354 132.415 104.487 134.742 108.825 139.701C113.3 144.816 114.319 152.303 109.623 161.696C105.186 170.574 105.636 175.207 107.882 177.703C109.078 179.032 110.985 180.031 113.672 180.687C116.349 181.341 119.65 181.617 123.454 181.617C131.071 181.617 140.362 180.514 150.081 179.392C153.398 179.009 156.761 178.624 160.111 178.283C169.453 177.334 176.887 169.539 175.931 160.198C175.602 156.986 175.232 153.744 174.86 150.52C173.746 140.872 172.613 131.355 172.613 123.497C172.613 119.562 172.895 115.959 173.639 112.911C174.381 109.873 175.617 107.234 177.643 105.41C181.855 101.618 188.404 102.134 197.415 106.641C205.91 110.89 211.841 109.673 215.67 106.322C219.655 102.833 221.801 96.6679 221.801 90.2596C221.801 83.8514 219.655 77.686 215.67 74.1977C211.841 70.8463 205.91 69.6291 197.415 73.8781C188.404 78.385 181.855 78.9016 177.643 75.109C175.617 73.2849 174.381 70.6467 173.639 67.6084C172.896 64.5602 172.613 60.9568 172.613 57.0225C172.613 49.164 173.746 39.647 174.86 29.9994C175.221 26.8666 175.581 23.717 175.903 20.5936C176.876 11.1524 169.299 3.375 159.808 3.375H5.66525Z"
					fill="white"
					id="2"
				/>
				<path
					d="M354.622 5.22929C354.622 4.7374 354.427 4.2656 354.079 3.9179C353.731 3.57024 353.26 3.37504 352.769 3.375H197.196C187.906 3.375 180.282 10.8383 179.35 20.0809C179.004 23.522 178.608 26.9789 178.215 30.3866C177.093 40.1089 175.99 49.4029 175.99 57.0225C175.99 60.8273 176.267 64.1299 176.92 66.8079C177.576 69.4955 178.575 71.4036 179.903 72.5993C182.398 74.8463 187.029 75.2965 195.904 70.8575C205.295 66.1606 212.78 67.1801 217.894 71.6563C222.852 75.9957 225.178 83.249 225.178 90.2596C225.178 97.2703 222.852 104.524 217.894 108.863C212.78 113.339 205.295 114.359 195.904 109.662C187.029 105.223 182.398 105.673 179.903 107.92C178.575 109.116 177.576 111.024 176.92 113.711C176.267 116.389 175.99 119.692 175.99 123.497C175.99 131.116 177.093 140.41 178.215 150.132C178.618 153.625 179.023 157.17 179.376 160.696C180.292 169.842 187.764 177.314 196.91 178.23C200.433 178.584 203.975 178.989 207.465 179.392C217.185 180.514 226.476 181.617 234.093 181.617C237.896 181.617 241.198 181.341 243.875 180.687C246.561 180.031 248.469 179.032 249.664 177.703C251.911 175.207 252.36 170.574 247.923 161.696C243.227 152.303 244.247 144.816 248.721 139.701C253.059 134.742 260.311 132.415 267.32 132.415C274.329 132.415 281.58 134.742 285.918 139.701C290.393 144.816 291.412 152.303 286.717 161.696C282.282 170.569 282.758 175.196 285.037 177.695C286.253 179.028 288.187 180.029 290.902 180.686C293.607 181.34 296.937 181.617 300.769 181.617C308.442 181.617 317.79 180.514 327.55 179.392C330.979 178.997 334.457 178.601 337.916 178.253C347.159 177.324 354.622 169.699 354.622 160.41V5.22929Z"
					fill="white"
					id="3"
				/>
				<path
					d="M354.623 197.967C354.623 188.476 346.845 180.9 337.404 181.87C334.262 182.193 331.091 182.555 327.937 182.918C318.25 184.033 308.681 185.167 300.77 185.167C296.809 185.167 293.18 184.884 290.109 184.14C287.047 183.399 284.388 182.163 282.543 180.139C278.701 175.924 279.189 169.363 283.697 160.336C287.945 151.83 286.728 145.892 283.377 142.058C279.89 138.067 273.727 135.919 267.321 135.919C260.915 135.919 254.752 138.067 251.264 142.058C247.914 145.892 246.697 151.83 250.945 160.336C255.45 169.358 255.966 175.914 252.175 180.131C250.352 182.159 247.714 183.397 244.677 184.14C241.629 184.885 238.027 185.167 234.093 185.167C226.237 185.167 216.723 184.033 207.078 182.918C203.857 182.545 200.619 182.175 197.409 181.846C188.068 180.888 180.273 188.322 179.326 197.664C178.985 201.025 178.599 204.399 178.216 207.727C177.093 217.458 175.991 226.761 175.991 234.387C175.991 238.195 176.268 241.501 176.921 244.181C177.577 246.871 178.576 248.781 179.904 249.978C182.399 252.227 187.03 252.678 195.905 248.235C205.296 243.534 212.78 244.554 217.895 249.034C222.852 253.378 225.179 260.638 225.179 267.655C225.179 274.672 222.852 281.932 217.895 286.275C212.78 290.756 205.296 291.776 195.905 287.075C187.03 282.632 182.399 283.082 179.904 285.331C178.576 286.528 177.577 288.438 176.921 291.128C176.268 293.809 175.991 297.114 175.991 300.923C175.991 308.549 177.093 317.852 178.216 327.583C178.61 330.999 179.005 334.464 179.353 337.913C180.283 347.156 187.907 354.619 197.197 354.619H352.77C353.261 354.619 353.732 354.424 354.08 354.076C354.427 353.728 354.623 353.256 354.623 352.763V197.967ZM90.2271 135.919C83.8212 135.919 77.6577 138.067 74.1704 142.058C70.8198 145.892 69.6032 151.83 73.8511 160.336C78.3566 169.358 78.8728 175.914 75.0817 180.131C73.2582 182.159 70.6204 183.397 67.5828 184.14C64.5354 184.885 60.933 185.167 56.9999 185.167C49.1436 185.167 39.6293 184.033 29.9847 182.918C26.8741 182.558 23.7468 182.2 20.6452 181.88C11.1868 180.902 3.40096 188.504 3.4248 198.013L3.81281 352.759V352.763C3.81281 353.256 4.0081 353.728 4.35571 354.076C4.70327 354.424 5.17453 354.619 5.66579 354.619H159.808C169.3 354.619 176.877 346.842 175.905 337.401C175.583 334.27 175.223 331.112 174.86 327.971C173.747 318.314 172.614 308.788 172.614 300.923C172.614 296.985 172.896 293.378 173.64 290.327C174.381 287.286 175.618 284.645 177.644 282.819C181.856 279.023 188.404 279.54 197.416 284.052C205.911 288.304 211.841 287.086 215.67 283.732C219.656 280.24 221.801 274.069 221.801 267.655C221.801 261.241 219.656 255.07 215.67 251.578C211.841 248.224 205.911 247.005 197.416 251.258C188.404 255.769 181.856 256.286 177.644 252.49C175.618 250.665 174.381 248.024 173.64 244.983C172.896 241.932 172.614 238.325 172.614 234.387C172.614 226.521 173.747 216.996 174.86 207.339C175.212 204.293 175.561 201.231 175.876 198.193C176.864 188.648 169.127 180.912 159.583 181.903C156.555 182.217 153.504 182.567 150.469 182.918C140.825 184.033 131.311 185.167 123.454 185.167C119.521 185.167 115.918 184.885 112.871 184.14C109.833 183.397 107.196 182.159 105.372 180.131C101.581 175.914 102.097 169.358 106.603 160.336C110.851 151.83 109.634 145.892 106.283 142.058C102.796 138.067 96.633 135.92 90.2271 135.919ZM5.66579 3.38055C5.17451 3.38057 4.70326 3.57598 4.35571 3.92394C4.00812 4.27196 3.81281 4.74416 3.81281 5.23655V5.24084L3.42348 160.536C3.40015 169.841 10.8687 177.492 20.1267 178.428C23.5479 178.774 26.9844 179.168 30.3722 179.559C40.0916 180.683 49.3827 181.787 56.9999 181.787C60.8034 181.787 64.1046 181.51 66.7816 180.856C69.4683 180.199 71.3757 179.199 72.5711 177.869C74.8178 175.37 75.2676 170.734 70.8299 161.847C66.1346 152.445 67.1538 144.952 71.6284 139.832C75.9665 134.868 83.2182 132.539 90.2271 132.539C97.2359 132.539 104.487 134.868 108.825 139.832C113.3 144.952 114.319 152.445 109.624 161.847C105.186 170.734 105.636 175.37 107.883 177.869C109.078 179.199 110.986 180.199 113.672 180.856C116.349 181.51 119.651 181.787 123.454 181.787C131.071 181.787 140.362 180.683 150.082 179.559C153.399 179.176 156.762 178.791 160.112 178.45C169.454 177.5 176.888 169.705 175.933 160.364C175.604 157.143 175.233 153.893 174.86 150.661C173.747 141.004 172.614 131.479 172.614 123.613C172.614 119.675 172.896 116.068 173.64 113.017C174.381 109.976 175.618 107.335 177.644 105.51C181.856 101.714 188.404 102.231 197.416 106.742C205.911 110.995 211.841 109.776 215.67 106.422C219.656 102.93 221.801 96.7593 221.801 90.3451C221.801 83.931 219.656 77.76 215.67 74.2684C211.841 70.9139 205.911 69.6956 197.416 73.9485C188.404 78.4596 181.856 78.9766 177.644 75.1805C175.618 73.3548 174.381 70.7141 173.64 67.673C172.896 64.6221 172.614 61.0154 172.614 57.0774C172.614 49.2117 173.747 39.6859 174.86 30.0294C175.223 26.8885 175.583 23.7305 175.905 20.599C176.877 11.1578 169.3 3.38055 159.808 3.38055H5.66579ZM354.623 5.23655C354.623 4.7442 354.427 4.27197 354.08 3.92394C353.732 3.57597 353.261 3.38059 352.77 3.38055H197.197C187.907 3.38055 180.283 10.844 179.353 20.0868C179.005 23.536 178.61 27.0012 178.216 30.417C177.093 40.1483 175.991 49.4508 175.991 57.0774C175.991 60.8857 176.268 64.1914 176.921 66.8718C177.577 69.5619 178.576 71.4718 179.904 72.6686C182.399 74.9176 187.03 75.3682 195.905 70.9251C205.296 66.224 212.78 67.2444 217.895 71.7247C222.852 76.068 225.179 83.3281 225.179 90.3451C225.179 97.3622 222.852 104.622 217.895 108.966C212.78 113.446 205.296 114.466 195.905 109.765C187.03 105.322 182.399 105.773 179.904 108.022C178.576 109.218 177.577 111.128 176.921 113.818C176.268 116.499 175.991 119.805 175.991 123.613C175.991 131.239 177.093 140.542 178.216 150.273C178.619 153.774 179.025 157.327 179.378 160.861C180.293 170.007 187.765 177.48 196.911 178.397C200.434 178.75 203.976 179.156 207.466 179.559C217.185 180.683 226.476 181.787 234.093 181.787C237.897 181.787 241.199 181.51 243.876 180.856C246.562 180.199 248.469 179.199 249.665 177.869C251.911 175.37 252.361 170.734 247.924 161.847C243.228 152.445 244.247 144.952 248.722 139.832C253.06 134.868 260.312 132.539 267.321 132.539C274.33 132.539 281.581 134.868 285.919 139.832C290.394 144.952 291.413 152.445 286.718 161.847C282.282 170.728 282.759 175.36 285.038 177.861C286.254 179.195 288.188 180.197 290.903 180.855C293.607 181.51 296.938 181.787 300.77 181.787C308.443 181.787 317.79 180.683 327.551 179.559C330.98 179.164 334.458 178.768 337.917 178.42C347.16 177.49 354.623 169.865 354.623 160.576V5.23655ZM358 352.763C358 354.152 357.449 355.484 356.468 356.466C355.487 357.448 354.157 358 352.77 358H5.66579C4.27842 358 2.94794 357.448 1.96709 356.466C0.987227 355.485 0.436482 354.155 0.435373 352.768L0.00420968 180.684C0.0018847 179.757 0.752213 179.002 1.68014 179V179V179C0.752213 178.998 0.00188471 178.243 0.00420968 177.316L0.435373 5.23226C0.436486 3.84514 0.987217 2.51487 1.96709 1.53379C2.94796 0.551762 4.27844 2.16495e-05 5.66579 0H352.77C354.157 3.96368e-05 355.487 0.551759 356.468 1.53379C357.449 2.51584 358 3.84789 358 5.23655V352.763Z"
					fill="#FF2121"
				/>
			</svg>
		</div>

		<div class="flex flex-wrap justify-between">
			{#each puzzleElements as elem, i}
				<button
					id={elem.id.toString()}
					bind:this={buttonElement}
					class="draggable h-[100px] w-[100px] bottom-0 left-0"
					draggable={true}
					ondragstart={(e) => handleDragStart(e, elem.id)}
					ondragend={handleDragEnd}
				>
					<img
						src={elem.imageSrc}
						alt=""
						class="drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)] w-full h-full object-cover"
						class:desaturate={puzzleElements[activePuzzleElement].isDragging === true}
					/>
				</button>
			{/each}
		</div>
	</Content>
</div>

<style>
	.desaturate {
		filter: saturate(0);
	}
	.draggable {
		/* ОБЯЗАТЕЛЬНО - позволяет позиционировать через left/top */
		touch-action: none; /* Отключает стандартные тач-жесты браузера */
		cursor: move; /* Показывает, что элемент можно перетаскивать */
		z-index: 10; /* Гарантирует, что кнопка над другими элементами */
		-webkit-touch-callout: none; /* Отключает контекстное меню на iOS */
		/* Предотвращает выделение текста в разных браузерах */
		-webkit-user-select: none; /* Chrome, Safari, Opera */
		-moz-user-select: none; /* Firefox */
		-ms-user-select: none; /* Internet Explorer/Edge */
		user-select: none; /* Standard syntax */
	}
	.dragging {
		/* Добавляем префиксы для transform для лучшей совместимости */
		-webkit-transform: scale(1.05);
		-ms-transform: scale(1.05); /* Для IE 9 */
		transform: scale(1.05);
		-webkit-filter: drop-shadow(8px 16px 10px rgba(0, 0, 0, 0.3));
		filter: drop-shadow(8px 16px 10px rgba(0, 0, 0, 0.3));
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
