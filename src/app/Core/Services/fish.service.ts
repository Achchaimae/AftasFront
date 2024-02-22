import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FishService {

  constructor(private http: HttpClient) {} 
  private url ='http://localhost:8080/fish'

  getFishes(): Observable<any> {
    return this.http.get(this.url);
  }
}
