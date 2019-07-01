export interface IMatch {
	'_id': string,
    result?: string,
    totalTime?: number,
    whiteP?: string,
    blackP?: string,
    startTime?: string,
    endTime?: string,
    isLive: boolean,
    isFinalized: boolean,
	winner?: string,
	timeExpired: boolean,
	isTimeGame: boolean,
	matchResult: MatchResult,
};

export enum MatchResult {
	NoResult = 0,
	Checkmate = 1,
	Stalemate = 2,
	InsufficentMaterial = 3,
	ThreefoldRepetition = 4,
	Draw = 5,
	OutOfTime = 6,
}