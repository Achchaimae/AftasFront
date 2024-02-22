import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HuntingService {

  constructor(private http: HttpClient) {} 
  private url ='http://localhost:8080/hunting'

  savehunting(data :any): Observable<any> {
    return this.http.post(this.url ,data);
  }
}
