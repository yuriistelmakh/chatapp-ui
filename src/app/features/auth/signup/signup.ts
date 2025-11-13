import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../../services/auth.service';
import { NgIf } from '@angular/common';
import { validateHorizontalPosition } from '@angular/cdk/overlay';
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
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  form: FormGroup;
  errorMsg: string | undefined = undefined;
  loading: boolean = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(30), Validators.pattern("^[a-zA-Z0-9]+$")]],
      password: ['', [Validators.required, Validators.maxLength(64)]],
    });
  }

  onSubmit() {
    if (!this.form.valid)
    {
      this.form.markAllAsTouched();
    }
    else
    {
      this.loading = true;
      const username = this.form.get('username')?.value;
      const password = this.form.get('password')?.value;

      this.auth.signUp({ username, password }).subscribe({
        next: data => {
          this.router.navigate(["/chat"]);
          localStorage.setItem("token", data.token);
        },
        error: err => this.errorMsg = err.error
      });

      this.loading = false;
    }
  }
}
