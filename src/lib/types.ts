export interface PuzzlePieceType {
	id: number;
	imageSrc: string;
	isPlaced: boolean;
	isDragging?: boolean;
	placeId?: number
}

export interface SlideItem {
	url: string;
	title: string;
}
