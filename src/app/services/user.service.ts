import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserDto } from '../dtos/UserDto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(`${environment.apiUrl}/users`);
  }

  getChatUsers(chatId: number): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(`${environment.apiUrl}/users/getFromChat/${chatId}`);
  }
}
