export interface PuzzlePieceType {
	id: number;
	imageSrc: string;
	isPlaced: boolean;
	isDragging?: boolean;
	placeId?: number
}
