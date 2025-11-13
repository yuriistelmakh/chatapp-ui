import { EventEmitter, Injectable, signal } from '@angular/core';
import * as signalR from '@microsoft/signalr'
import { MessageDto } from '../dtos/MessageDto';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { ChatDto } from '../dtos/ChatDto';
import { ChatService } from './chat.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { UserDto } from '../dtos/UserDto';
import { UserService } from './user.service';
import { AddUserToChatDto } from '../dtos/AddUserToChatDto';
import { CreateChatDto } from '../dtos/CreateChatDto';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubConnection!: signalR.HubConnection;
  messages: MessageDto[] = [];
  chats: ChatDto[] = [];
  users: UserDto[] = [];
  private _newMessageReceived = new Subject<void>();
  $newMessageReceived = this._newMessageReceived.asObservable();

  constructor(private auth: AuthService, private chatService: ChatService, private userService: UserService) {}

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
        this._newMessageReceived.next();
      }
    });

    this.hubConnection.on('ChatCreated', (createChatDto: CreateChatDto) => {
        if(createChatDto.memberIds.includes(this.auth.getUserId()!))
        {
          this.chats.push(createChatDto.chat);
        }
    });

    this.hubConnection.on('NewMemberAdded', (dto: AddUserToChatDto) => {
      this.users.push(dto.user);

      console.log(this.auth.getUserId(), " ", dto.user.id)
      if(this.auth.getUserId() == dto.user.id)
      {
        this.chats.push(dto.chat);
      }
    })
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
        this.chatService.getMessages(chatId).subscribe({
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

        this.userService.getChatUsers(chatId).subscribe({
          next: users => {this.users = users; console.log(users)},
          error: err => console.error(err)
        });
      })
      .catch((err) => console.error('JoinChat error:', err));
  }

  addUserToChat(chatId: number, userId: number) {
    this.hubConnection.invoke("NewMember", chatId, userId)
      .catch((err) => console.error(err));
  }

  leaveChat(chatId: number) {
    this.hubConnection.invoke('LeaveChat', chatId).catch((err) => console.error(err));
  }
}
