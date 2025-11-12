import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ChatSidebarItem } from "../chat-sidebar-item/chat-sidebar-item";
import { UserDto } from '../../../dtos/UserDto';
import { ChatDto } from '../../../dtos/ChatDto';
import { MessageDto } from '../../../dtos/MessageDto';
import { SignalRService } from '../../../services/signal-r.service';
import { ChatService } from '../../../services/chat';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-chat-sidebar',
  imports: [ChatSidebarItem],
  templateUrl: './chat-sidebar.html',
  styleUrl: './chat-sidebar.css',
})
export class ChatSidebarComponent implements OnInit {
  @Output() chatSelected = new EventEmitter<ChatDto>();

  constructor(private chat: ChatService, private auth: AuthService) {}

  onChatSelected(chat: ChatDto) {
    this.chatSelected.emit(chat);
  }

  chats: ChatDto[] = [];

  ngOnInit(): void {
    this.chat.getChats(this.auth.getUserId()!).subscribe({
      next: chats => {
        this.chats = chats;
      },
      error: err => console.error(err)
    });
  }
}
