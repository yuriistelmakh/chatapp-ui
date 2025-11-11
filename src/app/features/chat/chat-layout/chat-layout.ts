import { Component } from '@angular/core';
import { ChatSidebarComponent } from "../chat-sidebar/chat-sidebar";
import { ChatWindow } from "../chat-window/chat-window";
import { ChatDto } from '../../../dtos/ChatDto';

@Component({
  selector: 'app-chat-layout',
  imports: [ChatSidebarComponent, ChatWindow],
  templateUrl: './chat-layout.html',
  styleUrl: './chat-layout.css',
})
export class ChatLayoutComponent {
  selectedChat?: ChatDto;

  onChatSelected(chat: ChatDto) {
    this.selectedChat = chat;
  }
}
