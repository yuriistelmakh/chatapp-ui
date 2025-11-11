import { Component, Input } from '@angular/core';
import { UserDto } from '../../../dtos/UserDto';
import { MatIcon } from "@angular/material/icon";
import { ChatDto } from '../../../dtos/ChatDto';

@Component({
  selector: 'app-chat-sidebar-item',
  imports: [MatIcon],
  templateUrl: './chat-sidebar-item.html',
  styleUrl: './chat-sidebar-item.css',
})
export class ChatSidebarItem {
  @Input() chat!: ChatDto;
}
