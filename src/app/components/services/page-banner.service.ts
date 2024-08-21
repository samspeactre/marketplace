import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageBannerService {

  private titles: { [key: string]: string } = {
    '/': 'Home',
    '/pricing': 'Pricing',
    '/about': 'About Us',
    '/terms-conditions': 'Terms & Conditions',
    '/privacy-policy': 'Privacy Policy',
    '/contact': 'Contact Us',
    '/employers': 'Employers',
    '/employer-details': 'Employer Details',
    '/candidates': 'Candidates',
    '/candidates-details': 'Candidates Details',
    // Add more routes and titles as needed
  };

  public currentTitle: string = '';

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentTitle = this.titles[event.url] || 'Page';
      });
  }
}
