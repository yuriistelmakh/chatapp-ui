import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  constructor(private auth: AuthService) {}
  username: string | null = '';
  
  ngOnInit(): void {
    this.username = this.auth.getUserName();
  }
}
