import { RankingIdReq } from "./RankingIdReq.model";

export interface RankingReq {
    rank: number;
    score: number;
    id: RankingIdReq;
}