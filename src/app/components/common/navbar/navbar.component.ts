import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    isSticky: boolean = false;
    userRole: string | null = null;
    isLoggedIn: boolean = false; // Property to track login status

    @HostListener('window:scroll', ['$event'])
    checkScroll() {
        const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
        this.isSticky = scrollPosition >= 50;
    }

    constructor(public router: Router, private authService: AuthService) { }

    ngOnInit() {
        this.checkLoginStatus();
        this.userRole = this.authService.getUserRole();
    }



    checkLoginStatus() {
        this.isLoggedIn = !!localStorage.getItem('token');
    }

    classApplied = false;
    toggleClass() {
        this.classApplied = !this.classApplied;
    }

    currentTab = 'tab1';
    switchTab(event: MouseEvent, tab: string) {
        event.preventDefault();
        this.currentTab = tab;
    }

    currentInnerTab = 'innerTab1';
    switchInnerTab(event: MouseEvent, tab: string) {
        event.preventDefault();
        this.currentInnerTab = tab;
    }

    isOpen = false;
    openPopup(): void {
        this.isOpen = true;
    }
    closePopup(): void {
        this.isOpen = false;
    }

    async afterLogin(){
        localStorage.getItem('token');
    }
}
