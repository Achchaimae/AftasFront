import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  constructor(private http: HttpClient) {} 
  private url ='http://localhost:8080/user'

  getMembers(): Observable<any> {
    return this.http.get(this.url);
  }

  saveCompetition(data :any): Observable<any> {
    return this.http.post(this.url ,data);
  }
  findMember(attribute:any) :Observable<any>{
    return this.http.get(this.url +'/findByAtt/{id}?searchParam='+ attribute)
  }
  deleteMember(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/delete/${id}`);
  }
 
  
}
