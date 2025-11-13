import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

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
    MatProgressSpinner
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  form: FormGroup;
  loading: boolean = false;
  errorMsg: string | undefined = undefined;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  onSubmit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;

    const username = this.form.get('username')?.value;
    const password = this.form.get('password')?.value;

    this.auth.signIn({ username, password }).subscribe({
      next: (data) => {
        this.router.navigate(['/chat']);
        localStorage.setItem('token', data.token);
      },
      error: (err) => (this.errorMsg = err.error),
    });

    this.loading = false;
  }
}
