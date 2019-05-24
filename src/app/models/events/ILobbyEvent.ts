import { LobbyEvents } from 'src/app/core/services/lobby-web-socket.service';

export interface ILobbyEvent {
	type: LobbyEvents,
	payload: any
}