import { Component, Input } from '@angular/core';
import { ChatDto } from '../../../dtos/ChatDto';
import { SignalRService } from '../../../services/signal-r.service';
import { MatIcon } from "@angular/material/icon";
import { MatRipple } from "@angular/material/core";
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddNewUserDialog, AddNewUserDialogData } from '../add-new-user/add-new-user-dialog';

@Component({
  selector: 'app-chat-users-list',
  imports: [MatIcon, MatButton],
  templateUrl: './chat-users-list.html',  
  styleUrl: './chat-users-list.css',
})
export class ChatUsersList {
  @Input() selectedChat?: ChatDto;

  constructor(public signalr: SignalRService, private dialog: MatDialog) {}

  openCreateChatDialog(): void {
    const memberIds = this.signalr.users.map((u) => u.id);
    console.log(this.selectedChat!.id);
    this.dialog.open<AddNewUserDialog, AddNewUserDialogData>(AddNewUserDialog, {
      width: '500px',
      height: '350px',
      data: { existingMemberIds: memberIds, chatId: this.selectedChat!.id }
    });
  }
}
