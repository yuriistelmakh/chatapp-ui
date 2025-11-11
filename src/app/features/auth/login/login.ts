import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../../services/auth.service';
import { NgIf } from '@angular/common';
import { validateHorizontalPosition } from '@angular/cdk/overlay';

@Component({
  selector: 'app-signup',
  imports: [
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatIcon,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  form: FormGroup;
  errorMsg: string | undefined = undefined;

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    const username = this.form.get('username')?.value;
    const password = this.form.get('password')?.value;

    this.auth.signIn({ username, password }).subscribe({
      next: (data) => console.log(data.success + ' ' + data.message + ' ' + data.token),
      error: (err) => this.errorMsg = err.error,
    });
  }
}
