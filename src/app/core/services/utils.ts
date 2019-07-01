import { IBoardStatus } from 'src/app/models/api/IBoardStatus';
import { MatchResult } from 'src/app/models/api/IMatch';

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
	},

	getMatchResult: (boardStatus: IBoardStatus) => {
		if (boardStatus.inCheckmate) {
			return MatchResult.Checkmate;
		} else if (boardStatus.inStalemate) {
			return MatchResult.Stalemate;
		} else if (boardStatus.insufficientMaterial) {
			return MatchResult.InsufficentMaterial;
		} else if (boardStatus.inThreefoldRepetition) {
			return MatchResult.ThreefoldRepetition;
		} else if (boardStatus.inDraw) {
			return MatchResult.Draw;
		}
		return MatchResult.NoResult;
	}
}