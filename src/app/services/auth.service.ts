import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthRequest } from '../dtos/authrequest';
import { environment } from '../app.routes';
import { AuthResult } from '../dtos/authresult';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signUp(request: AuthRequest) : Observable<AuthResult>  {
    return this.http.post<AuthResult>(
      `${environment.apiUrl}/Auth/register`, request
    );
  }

  signIn(request: AuthRequest) : Observable<AuthResult> {
    return this.http.post<AuthResult>(
      `${environment.apiUrl}/Auth/login`, request
    );
  }
}
