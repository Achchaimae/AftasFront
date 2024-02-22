export interface User {

    id: 0,
    firstname: '',
    lastname: '',
    email :'',
    password : '';
    accessionDate : Date |null;
    nationality : string;
    identityDocumentType :  'CIN'|'CARTE_RESIDENCE'|'PASSPORT';
    identityNumber :'';
    role : ''| 'Jury'|'Participant'|'Manager'; 
}