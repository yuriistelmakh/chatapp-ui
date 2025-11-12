import { Component, OnInit } from '@angular/core';
import { UserDto } from '../../../dtos/UserDto';

@Component({
  selector: 'app-chat-users-list',
  imports: [],
  templateUrl: './chat-users-list.html',
  styleUrl: './chat-users-list.css',
})
export class ChatUsersList implements OnInit {
  members: UserDto[] = [];

  ngOnInit(): void {
    
  }
}
