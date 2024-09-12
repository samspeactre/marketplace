import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service'; // Make sure you have an AuthService for handling authentication

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: any): boolean {
    const expectedRole = route.data.expectedRole;
    const userRole = this.authService.getUserRole();

    if (this.authService.isLoggedIn()) {
      if (expectedRole && userRole !== expectedRole) {
        // Redirect based on role
        this.router.navigate(['/access-denied']); // Redirect to an "Access Denied" page or appropriate route
        return false;
      }
      return true;
    } else {
      this.router.navigate(['/']); // Redirect to the login page if not logged in
      return false;
    }
  }
}
