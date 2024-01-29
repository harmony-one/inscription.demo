export interface ILotteryInfo {
    startTime: number;
    endTime: number;
    firstTx: string;
    winnerTx: string;
    winnerDomain: string;
    winnerLink: string;
    totalTxs: number;
    winners: string[];
}