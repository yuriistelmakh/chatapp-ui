import { Injectable, signal } from '@angular/core';
import * as signalR from '@microsoft/signalr'
import { MessageDto } from '../dtos/MessageDto';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { ChatDto } from '../dtos/ChatDto';
import { ChatService } from './chat';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubConnection!: signalR.HubConnection;
  messages: MessageDto[] = [];

  constructor(private auth: AuthService, private chat: ChatService) {}

  startConnection(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.apiUrl}/chat`, {
        withCredentials: true,
        accessTokenFactory: () => localStorage.getItem('token') ?? '',
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('SignalR connected'))
      .catch((err) => console.log('Error ocurred! ', err));

    this.hubConnection.on('ReceiveMessage', (userId: number, msg: MessageDto) => {
      if (userId != this.auth.getUserId()) {
        msg.isIncoming = true;
        this.messages.push(msg);
      }
    });
  }

  sendMessage(chatId: number, message: MessageDto) {
    this.hubConnection
      .invoke('SendMessageToGroup', chatId, this.auth.getUserId(), message)
      .catch((err) => console.error(err));

    this.messages.push(message);
  }

  joinChat(chatId: number) {
    this.hubConnection
      .invoke<MessageDto[]>('JoinChat', chatId)
      .then(() => {
        const userName = this.auth.getUserName();
        this.chat.getMessages(chatId).subscribe({
          next: messages => {
            messages.forEach((m: MessageDto) => {
              if (m.senderName != userName)
              {
                m.isIncoming = true;
              }
              return m;
            });

            this.messages = messages;
          },
          error: err => {
            console.error("Error ocurred fetching messages: ", err);
          }
        });
      })
      .catch((err) => console.error('JoinChat error:', err));
  }

  leaveChat(chatId: number) {
    this.hubConnection.invoke('LeaveChat', chatId).catch((err) => console.error(err));
  }
}
