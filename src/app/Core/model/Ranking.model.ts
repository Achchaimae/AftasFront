import { Member } from "./Member.model";
import { RankingId } from "./RankingId.model";

export interface Ranking {
    rank : number;
    score : number;
    id : RankingId|null;
}