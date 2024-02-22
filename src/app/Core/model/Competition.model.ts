import { Ranking } from "./Ranking.model";
import { Hunting } from "./Hunting.model";

export interface Competition {
    code: string;
    date: Date;
    startTime: String;
    endTime: String;
    numberOfParticipants: number;
    location: string;
    amount: number; 
    etat : "close" | "one_day_remaining"|"waiting"|"Pending";
    rankings: Ranking[];
    hunting: Hunting | null;
}
