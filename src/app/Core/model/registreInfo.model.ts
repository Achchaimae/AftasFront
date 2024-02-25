export interface registerInfo {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    accessionDate: Date | null;
    nationality: string;
    identityDocumentType: '' | 'CIN' | 'CARTE_RESIDENCE' | 'PASSPORT';
    identityNumber: string;
    role: string;
}

  
