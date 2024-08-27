import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // This method checks if the user is logged in
  isLoggedIn(): boolean {
    // For simplicity, we're just checking if there's a token in local storage
    // You can replace this with a more sophisticated check as needed
    return !!localStorage.getItem('token');
  }

  getUserRole(): string | null {
    // Logic to retrieve user role from local storage or your auth system
    return localStorage.getItem('role');
  }

  // This method would typically be called when the user logs in
  login(token: string): void {
    localStorage.setItem('token', token);
  }

  // This method would typically be called when the user logs out
  logout(): void {
    localStorage.removeItem('token');
  }
}
