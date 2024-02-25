export interface User {

    id:string ,
    firstname: '',
    lastname: '',
    email :'',
    password : '';
    accessionDate : Date |null;
    nationality : string;
    identityDocumentType : ''| 'CIN'|'CARTE_RESIDENCE'|'PASSPORT';
    identityNumber :'';
    role : ''| 'Jury'|'Participant'|'Manager'; 
}