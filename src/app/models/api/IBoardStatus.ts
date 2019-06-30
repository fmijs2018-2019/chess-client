export interface IBoardStatus {
	inCheck: boolean;
	inCheckmate: boolean;
	inDraw: boolean;
	inStalemate: boolean;
	inThreefoldRepetition: boolean;
	insufficientMaterial: boolean;
	gameOver: boolean;
}
