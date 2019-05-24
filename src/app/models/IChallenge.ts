export interface IChallenge {
	id: string,
	socketId: string,
	sub:  string,
	pieces: string,
	time?: number
}