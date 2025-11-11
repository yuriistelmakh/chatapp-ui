import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from './app.routes';
import { MatButtonModule } from '@angular/material/button';
import { Login } from "./features/auth/login/login";
import { Signup } from "./features/auth/signup/signup";

@Component({
  selector: 'app-root',
  imports: [MatButtonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('chat-app-ui');

  constructor(private http: HttpClient) {}

  onClick() {
    this.http.get(`${environment.apiUrl}/test`).subscribe(data => console.log(data));
  }
}
