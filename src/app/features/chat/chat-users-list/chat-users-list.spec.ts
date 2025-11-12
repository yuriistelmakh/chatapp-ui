import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatUsersList } from './chat-users-list';

describe('ChatUsersList', () => {
  let component: ChatUsersList;
  let fixture: ComponentFixture<ChatUsersList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatUsersList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatUsersList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
