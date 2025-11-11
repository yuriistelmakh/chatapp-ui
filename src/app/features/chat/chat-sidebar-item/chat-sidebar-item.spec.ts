import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatSidebarItem } from './chat-sidebar-item';

describe('ChatSidebarItem', () => {
  let component: ChatSidebarItem;
  let fixture: ComponentFixture<ChatSidebarItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatSidebarItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatSidebarItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
