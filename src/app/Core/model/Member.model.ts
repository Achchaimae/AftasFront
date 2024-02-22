export interface Member {
    num : number; 
    name : String;
    familtyName : String;
    accessionDate : Date;
    nationality : String;
    identityDocumentType : "CIN" |"CARTE_RESIDENCE" |"PASSPORT" | null
    identityNumber : String;

}