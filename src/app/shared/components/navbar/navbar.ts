import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { MatAnchor } from "@angular/material/button";
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [MatAnchor],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}
  username: string | null = '';
  
  ngOnInit(): void {
    this.username = this.auth.getUserName();
  }

  onLogout() {
    this.auth.logout();
    this.router.navigate(['login']);
  }
}
