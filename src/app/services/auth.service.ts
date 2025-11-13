import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthRequest } from '../dtos/AuthRequest';
import { AuthResult } from '../dtos/AuthResult';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  nameid: string,
  unique_name: string;
  exp: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try
    {
      const decodedToken = this.getDecodedToken();
      const now = Date.now() / 1000;
      return decodedToken.exp > now;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

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

  logout() {
    localStorage.removeItem("token");
  }

  private getDecodedToken(): JwtPayload {
    return jwtDecode<JwtPayload>(localStorage.getItem("token")!);
  }

  getUserId(): number | null {
    var decodedToken = this.getDecodedToken();
    if (decodedToken)
    {
      return parseInt(decodedToken.nameid);
    }
    
    return null;
  }

  getUserName(): string | null {
    var decodedToken = this.getDecodedToken();
    if (decodedToken)
    {
      return decodedToken.unique_name;
    }
    
    return null;
  }
}
