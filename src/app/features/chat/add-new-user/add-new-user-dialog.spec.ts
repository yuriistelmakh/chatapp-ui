import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewUserDialog } from './add-new-user-dialog';

describe('AddNewUser', () => {
  let component: AddNewUserDialog;
  let fixture: ComponentFixture<AddNewUserDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewUserDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewUserDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
