// src/app/core/auth/auth.interceptor.ts
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const token = authService.getToken();
  
    if (token) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next(authReq).pipe(
        catchError((error:HttpErrorResponse)=>{
          if(error.status ===401){
            authService.clearAuthData();
            router.navigate(['login-admin'])
          }
          return throwError(()=>error);
        })
      );  // Cambiado de next.handle() a next()
    }
  
    return next(req);  // Cambiado de next.handle() a next()
  };