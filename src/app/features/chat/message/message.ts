import { Component, Input } from '@angular/core';
import { MessageDto } from '../../../dtos/MessageDto';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-message',
  imports: [NgClass, DatePipe],
  templateUrl: './message.html',
  styleUrl: './message.css',
})
export class Message {
  @Input() message!: MessageDto;
}
