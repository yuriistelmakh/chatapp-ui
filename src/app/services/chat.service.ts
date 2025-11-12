import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MessageDto } from '../dtos/MessageDto';
import { environment } from '../../environments/environment';
import { ChatDto } from '../dtos/ChatDto';
import { UserDto } from '../dtos/UserDto';
import { CreateChatDto } from '../dtos/CreateChatDto';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private http: HttpClient){}

  getMessages(chatId: number): Observable<MessageDto[]> {
    return this.http.get<MessageDto[]>(`${environment.apiUrl}/chats/${chatId}/messages`);
  }

  getChats(userId: number) : Observable<ChatDto[]> {
    return this.http.get<ChatDto[]>(`${environment.apiUrl}/chats/${userId}`);
  }

  addChat(createChatDto: CreateChatDto) {
     return this.http.post(`${environment.apiUrl}/chats`, createChatDto);
  }
}
