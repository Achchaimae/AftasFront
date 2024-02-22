import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RankingService {
  constructor(private http: HttpClient) {} 
  private url ='http://localhost:8080/ranking'

  getRankings(): Observable<any> {
    return this.http.get(this.url);
  }

  findRanking(id:any) : Observable<any>{
    return this.http.get(this.url +'/'+id)
  }
  saveRanking(data:any) : Observable<any>{
    return this.http.post(this.url , data);
  }
  
  getPodium(code:any) : Observable<any>{

    return this.http.get(this.url +'/findByComp/'+code);
  }
  getRanking(code:any) : Observable<any>{

    return this.http.get(this.url +'/findByCompOrder/'+code);
  }

  saveRank(code:any) :Observable<any>{
    return this.http.get(this.url  +'/poduim/'+code)
  }

  deleteRank(CompCode:any, MemberCode:any ):Observable<any>{
    return this.http.delete(this.url+'/'+ CompCode +'/'+ MemberCode);

  }
}
