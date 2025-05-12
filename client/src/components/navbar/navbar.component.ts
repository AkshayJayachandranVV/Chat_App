import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
@Component({
  selector: 'app-navbar',
  imports: [CommonModule, MenubarModule, ButtonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  items = [
    { label: 'Home', icon: 'pi pi-home', routerLink: ['/home'] },
    { label: 'Chat', icon: 'pi pi-chart-line', routerLink: ['/chat'] },
    { label: 'Profile', icon: 'pi pi-user', routerLink: ['/profile'] },
  ];

  constructor(private router: Router) {}

  logout() {
    this.router.navigate(['/']);  
  }
}
