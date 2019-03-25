export interface IEvent {
	room: string,
	type: EventType,
	payload: any
};

export enum EventType {
	Message = 0,
	Move = 1
};
