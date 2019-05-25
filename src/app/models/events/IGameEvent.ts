import { GameEvents } from 'src/app/core/services/game-web-socket.service.';

export interface IGameEvent {
	type: GameEvents,
	payload: any
}