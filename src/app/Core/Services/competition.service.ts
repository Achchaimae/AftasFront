import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  constructor(private http: HttpClient) {} 
  private url ='http://localhost:8080/competition'


  getCompetitions(page :number): Observable<any> {
    return this.http.get(this.url + '?size=4&page=' + page).pipe(
      catchError((error) => {
        console.error('Error:', error);
        return throwError('An error occurred while fetching competitions.');
      })
    );
  }

  saveCompetition(data :any): Observable<any> {
    return this.http.post(this.url ,data);
  }

  findCompetition(id:any) : Observable<any>{
    return this.http.get(this.url +'/find/'+ id);
  }
  getCompetitionByEtat(etat: any, page:number) :Observable<any>{
    return this.http.get(this.url+ '/etat/'+ etat+'?size=4&page='+page);

  }
}
