import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AsyncPipe } from '@angular/common';
import { map, Observable, startWith, tap } from 'rxjs';
import { UserDto } from '../../../dtos/UserDto';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { SignalRService } from '../../../services/signal-r.service';

export interface AddNewUserDialogData {
  existingMemberIds: number[];
  chatId: number;
}

@Component({
  selector: 'app-add-new-user',
  imports: [
    MatDialogModule,
    MatFormField,
    MatLabel,
    MatInputModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    AsyncPipe
  ],
  templateUrl: './add-new-user-dialog.html',
  styleUrl: './add-new-user-dialog.css',
})
export class AddNewUserDialog implements OnInit {
  existingMemberIds: number[];
  formControl = new FormControl<string | UserDto>('');
  autocompleteUsers: UserDto[] = [];
  filteredOptions?: Observable<UserDto[]>;
  selectedUser: UserDto | null = null;
  chatId: number;

  constructor(
    private dialogRef: MatDialogRef<AddNewUserDialog>,
    @Inject(MAT_DIALOG_DATA) data: AddNewUserDialogData,
    private userService: UserService,
    private auth: AuthService,
    private signalr: SignalRService
  ) {
    this.existingMemberIds = data?.existingMemberIds ?? [];
    this.chatId = data.chatId;
  }

  ngOnInit(): void {
    this.loadUsers();

    this.filteredOptions = this.formControl.valueChanges.pipe(
      startWith(''),
      tap((value) => {
        if (typeof value === 'string' && value !== this.selectedUser?.username) {
          this.selectedUser = null;
        }
      }),
      map((value) => this.filterUsers(value))
    );
  }

  private loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (users) => {
        const currentUserId = this.auth.getUserId();
        this.autocompleteUsers = users
          .filter((user) => user.id !== currentUserId)
          .filter((user) => !this.existingMemberIds.includes(user.id));
        const currentValue = this.formControl.value ?? '';
        this.formControl.setValue(currentValue as string | UserDto);
      },
    });
  }

  private filterUsers(raw: string | UserDto | null): UserDto[] {
    const value = typeof raw === 'string' ? raw : raw?.username ?? '';
    const normalized = value.trim().toLowerCase();
    return this.autocompleteUsers
      .filter((option) => option.username.toLowerCase().includes(normalized))
      .filter((option) => !this.selectedUser || option.id !== this.selectedUser.id)
      .slice(0, 10);
  }

  displayUser(user?: UserDto | string | null): string {
    if (!user) {
      return '';
    }
    return typeof user === 'string' ? user : user.username;
  }

  onUserSelected(event: MatAutocompleteSelectedEvent): void {
    this.selectedUser = event.option.value as UserDto;
    this.formControl.setValue(this.selectedUser.username, { emitEvent: false });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  confirm(): void {
    if (!this.selectedUser) {
      return;
    }
    this.signalr.addUserToChat(this.chatId, this.selectedUser.id);
    this.dialogRef.close(this.selectedUser);
  }
}
