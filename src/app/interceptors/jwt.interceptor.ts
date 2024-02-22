// // jwt.interceptor.ts

// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor
// } from '@angular/common/http';
// import { Observable } from 'rxjs';

// import { catchError, switchMap } from 'rxjs/operators';
// import { throwError } from 'rxjs';
// import { AuthService } from '../Core/Services/auth.service';

// @Injectable()
// export class JwtInterceptor implements HttpInterceptor {

//   constructor(private authService: AuthService) {}

//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const token = localStorage.getItem('jwtToken');

//     if (token) {
//       request = request.clone({
//         setHeaders: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//     }

//     return next.handle(request).pipe(
//       catchError(error => {
//         if (error.status === 401 && !request.url.includes('refresh-token')) {
//           return this.handle401Error(request, next);
//         }
//         return throwError(error);
//       })
//     );
//   }

//   private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     return this.authService.refreshToken().pipe(
//       switchMap(() => {
//         const newToken = localStorage.getItem('jwtToken');
//         request = request.clone({
//           setHeaders: {
//             Authorization: `Bearer ${newToken}`
//           }
//         });
//         return next.handle(request);
//       })
//     );
//   }
// }
