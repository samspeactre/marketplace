import { Component, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthPopupComponent } from '../auth-popup/auth-popup.component';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {

    @ViewChild(AuthPopupComponent) authPopup!: AuthPopupComponent;

    // Navbar Sticky
    isSticky: boolean = false;
    userRole: string | null = null;
    isLoggedIn: boolean = false; // Property to track login status



    @HostListener('window:scroll', ['$event'])
    checkScroll() {
        const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
        if (scrollPosition >= 50) {
            this.isSticky = true;
        } else {
            this.isSticky = false;
        }
    }

    constructor(public router: Router, private authService: AuthService) { }

    classApplied = false;
    toggleClass() {
        this.classApplied = !this.classApplied;
    }

    
    
    ngOnInit() {
        this.checkLoginStatus();
        this.userRole = this.authService.getUserRole();
    }



    checkLoginStatus() {
        this.isLoggedIn = !!localStorage.getItem('token');
    }

    // Tabs 1
    currentTab = 'tab1';
    switchTab(event: MouseEvent, tab: string) {
        event.preventDefault();
        this.currentTab = tab;
    }

    // Tabs 2
    currentInnerTab = 'innerTab1';
    switchInnerTab(event: MouseEvent, tab: string) {
        event.preventDefault();
        this.currentInnerTab = tab;
    }

    // Modal Popup
    isOpen = false;
    openPopup(): void {
        this.isOpen = true;
    }
    closePopup(): void {
        this.isOpen = false;
    }

}
