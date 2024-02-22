import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';
import { User } from '../model/User.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/v1/auth';
  private jwtHelper: JwtHelperService = new JwtHelperService();
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient,private cookieService: CookieService) {}

  register(data:any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`,data);
  }

  authentication(data:any): Observable<any> {
    return this.http.post(`${this.apiUrl}/authenticate`,data);
  }

  getUserInfo(token: string): any {
    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken;
  }

  setAuthInfo(token: string,user:User): void {
    this.cookieService.set('token', token);
    this.cookieService.set('user', JSON.stringify(user));
  }

  getAuthToken() : string
  {
    // console.log(this.cookieService.get('token'))
    return this.cookieService.get('token');
  }
  getAuthUser(): User | null {
    const userString = this.cookieService.get('user');
  
    if (!userString) {
      return null;  // 'user' cookie does not exist
    }
  
    try {
      return JSON.parse(userString) as User;
    } catch (error) {
      console.error('Error parsing user cookie:', error);
      return null;
    }
  }

  // Clear the authentication token from the cookie
  clearAuthToken(): void {
    this.cookieService.delete('token');
    this.cookieService.delete('user');
  }

  // Check if the user is authenticated based on the presence of a valid token in the cookie
  isAuthenticated(): Observable<boolean> {
    return of(this.cookieService.check('token'));
  }
}