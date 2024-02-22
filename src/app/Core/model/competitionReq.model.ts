import { Time } from "@angular/common";

export interface CompetitionReq {
    code :String 
    date: Date
    startTime : String;
    endTime : String
    numberOfParticipants : number
    location : String
    amount : number
   

}