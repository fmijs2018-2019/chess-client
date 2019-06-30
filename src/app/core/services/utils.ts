export const ChessUtils = {
	getTimeStrFromSeconds: (seconds: number) => {
		if (!seconds || seconds === -1) {
			return "00:00";
		}

		const min = Math.floor(seconds / 60);
		const sec = seconds % 60;
		const minStr = min > 9 ? min.toString() : '0' + min.toString();
		const secStr = sec > 9 ? sec.toString() : '0' + sec.toString();
		return minStr + ':' + secStr;
	}
}