import { Injectable } from '@angular/core';

export interface ITimerOptions {
	gameTime: number; //seconds per player
	onTimeExpire: (pieces: string) => void;
}

export interface ChessTimer {
	seconds: number;
}

@Injectable({
	providedIn: 'root'
})
export class TimerService {
	private whitePlayerTimer: ChessTimer;
	private blackPlayerTimer: ChessTimer;

	private whitePlayerTimerInterval: any;
	private blackPlayerTimerInterval: any;

	private options: ITimerOptions;

	init = (options: ITimerOptions) => {
		this.options = options;
		this.whitePlayerTimer = {
			seconds: options.gameTime
		};
		this.blackPlayerTimer = {
			seconds: options.gameTime
		};
	}

	getWhiteTimer = () => this.whitePlayerTimer;
	getBlackTimer = () => this.blackPlayerTimer;

	onTimeExpired = (pieces: string) => {
		this.pauseBlackTimer();
		this.pauseWhiteTimer();
		this.options.onTimeExpire(pieces);
	}

	getTimer = (color: 'w' | 'b') => {
		return color === 'w'
			? this.whitePlayerTimer.seconds
			: this.blackPlayerTimer.seconds;
	}

	startWhiteTimer = () => {
		this.whitePlayerTimerInterval = setInterval(() => {
			this.whitePlayerTimer.seconds -= 1;
			if (this.whitePlayerTimer.seconds <= 0) {
				this.onTimeExpired('white');
			}
		}, 1000);
	}

	startTimer = (pieces: 'w' | 'b') => {
		if (pieces === 'w') {
			this.startWhiteTimer();
		} else {
			this.startBlackTimer();
		}
	}

	pauseTimer = (pieces: 'w' | 'b') => {
		if (pieces === 'w') {
			return this.pauseWhiteTimer();
		} else {
			return this.pauseBlackTimer();
		}
	}

	pauseWhiteTimer = () => {
		if (this.whitePlayerTimerInterval) {
			clearInterval(this.whitePlayerTimerInterval);
		}
		return this.whitePlayerTimer.seconds;
	}

	setTimer = (color: 'w' | 'b', seconds: number) => {
		if (color === 'w') {
			this.setWhiteTimer(seconds);
		} else {
			this.setBlackTimer(seconds);
		}
	}

	setWhiteTimer = (seconds: number) => {
		if (this.whitePlayerTimer) {
			this.whitePlayerTimer.seconds = seconds;
		}
	}

	setBlackTimer = (seconds: number) => {
		if (this.blackPlayerTimer) {
			this.blackPlayerTimer.seconds = seconds;
		}
	}

	pauseBlackTimer = () => {
		if (this.blackPlayerTimerInterval) {
			clearInterval(this.blackPlayerTimerInterval);
		}
	}

	startBlackTimer = () => {
		this.blackPlayerTimerInterval = setInterval(() => {
			this.blackPlayerTimer.seconds -= 1;
			if (this.blackPlayerTimer.seconds <= 0) {
				this.onTimeExpired('white');
			}
		}, 1000);
	}
}
