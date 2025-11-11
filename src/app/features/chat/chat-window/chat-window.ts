import { Component, ElementRef, Input, NgModule, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ChatDto } from '../../../dtos/ChatDto';
import { MessageDto } from '../../../dtos/MessageDto';
import { Message } from "../message/message";
import { NgClass } from '@angular/common';
import { MatAnchor, MatFabAnchor } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-chat-window',
  imports: [Message, NgClass, MatIcon, MatFabAnchor, FormsModule],
  templateUrl: './chat-window.html',
  styleUrl: './chat-window.css',
})
export class ChatWindow implements OnChanges {
  @Input() selectedChat?: ChatDto;

  @ViewChild('bottomAnchor')
  private bottom?: ElementRef<HTMLDivElement>;

  @ViewChild('messagesList')
  private list?: ElementRef<HTMLUListElement>;

  private scrollToBottom() {
    const el = this.list?.nativeElement;
    if (el) {
      requestAnimationFrame(() => {
        el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
      });
      return;
    }
    this.bottom?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }
  messages: MessageDto[] = [];

  messageText: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['selectedChat'] && !changes['selectedChat'].firstChange) {
      this.messages = [];
      for (let i = 0; i < 3; i++) {
        this.messages.push({
          id: i,
          content: Math.random().toString(),
          createdAt: new Date(Date.now()),
          senderName: "Sender1",
          isIncoming: i % 2 == 0
        });
      }
    }
  }

  onSend() {
    if (this.messageText == '')
      return;

    this.messages.push(
      {
        id: this.messages.length + 1,
        content: this.messageText,
        createdAt: new Date(Date.now()),
        senderName: "Sender 2",
        isIncoming: false
      }
    )

    this.messageText = '';
    queueMicrotask(() => this.scrollToBottom());
  }
}
