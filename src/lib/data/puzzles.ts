import type { PuzzlePieceType } from '$lib/types';
import owl00PNG from '$lib/assets/puzzles/owl/owl-0.png';
import owl01PNG from '$lib/assets/puzzles/owl/owl-1.png';
import owl02PNG from '$lib/assets/puzzles/owl/owl-2.png';
import owl03PNG from '$lib/assets/puzzles/owl/owl-3.png';
import che00PNG from '$lib/assets/puzzles/che/0.png';
import che01PNG from '$lib/assets/puzzles/che/1.png';
import che02PNG from '$lib/assets/puzzles/che/2.png';
import che03PNG from '$lib/assets/puzzles/che/3.png';
import che04PNG from '$lib/assets/puzzles/che/4.png';
import che05PNG from '$lib/assets/puzzles/che/5.png';
import che06PNG from '$lib/assets/puzzles/che/6.png';
import che07PNG from '$lib/assets/puzzles/che/7.png';
import che08PNG from '$lib/assets/puzzles/che/8.png';

export const puzzleOwlPieces: PuzzlePieceType[] = [
	{
		id: 0,
		imageSrc: owl00PNG,
		isPlaced: false,
		placeId: 2
	},
	{
		id: 1,
		imageSrc: owl01PNG,
		isPlaced: false,
		placeId: 3
	},
	{
		id: 2,
		imageSrc: owl02PNG,
		isPlaced: false,
		placeId: 0
	},
	{
		id: 3,
		imageSrc: owl03PNG,
		isPlaced: false,
		placeId: 1
	}
];

export const puzzleChePieces = [
	{
		id: 0,
		imageSrc: che00PNG,
		isPlaced: false,
		placeId: 8
	},
	{
		id: 1,
		imageSrc: che01PNG,
		isPlaced: false,
		placeId: 7
	},
	{
		id: 2,
		imageSrc: che02PNG,
		isPlaced: false,
		placeId: 6
	},
	{
		id: 3,
		imageSrc: che03PNG,
		isPlaced: false,
		placeId: 5
	},
	{
		id: 4,
		imageSrc: che04PNG,
		isPlaced: false,
		placeId: 4
	},
	{
		id: 5,
		imageSrc: che05PNG,
		isPlaced: false,
		placeId: 3
	},
	{
		id: 6,
		imageSrc: che06PNG,
		isPlaced: false,
		placeId: 2
	},
	{
		id: 7,
		imageSrc: che07PNG,
		isPlaced: false,
		placeId: 1
	},
	{
		id: 8,
		imageSrc: che08PNG,
		isPlaced: false,
		placeId: 0
	}
];
