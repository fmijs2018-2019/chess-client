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
};
