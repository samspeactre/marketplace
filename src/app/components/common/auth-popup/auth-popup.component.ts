import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-auth-popup',
  templateUrl: './auth-popup.component.html',
  styleUrls: ['./auth-popup.component.scss']
})
export class AuthPopupComponent {
  public CandidateloginForm: FormGroup;
  public candidateLogin: FormGroup;
  public EmployerloginForm: FormGroup;
  public employerLogin: FormGroup;

  isFormValid: boolean = false;

  // Navbar Sticky
  isSticky: boolean = false;
  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isSticky = scrollPosition >= 50;
  }

  constructor(
    private router: Router,
    private http: HttpService,
    private fb: FormBuilder,
    private toastr: ToastrService,
  ) {
    this.CandidateloginForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required]],
      password: ['', [Validators.required]],
      role: ['candidate', [Validators.required]],
    });

    this.CandidateloginForm.valueChanges.subscribe(() => {
      this.isFormValid = this.CandidateloginForm.valid;
    });

    this.candidateLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      role: ['candidate', [Validators.required]],
    });

    this.EmployerloginForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required]],
      password: ['', [Validators.required]],
      role: ['employer', [Validators.required]],
    });

    this.EmployerloginForm.valueChanges.subscribe(() => {
      this.isFormValid = this.EmployerloginForm.valid;
    });

    this.employerLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      role: ['employer', [Validators.required]],
    });
  }

  classApplied = false;
  toggleClass() {
    this.classApplied = !this.classApplied;
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

  createUserAccount() {
    if (this.CandidateloginForm.valid) {
      const formData = this.CandidateloginForm.value;
      this.http.post('auth/signup', formData, false).subscribe(
        (res: any) => {
          this.currentTab = 'tab1';  // Switch to the login tab
        },
        (error: any) => {
          this.toastr.error('Signup failed. Please try again.');
        }
      );
    } else {
      this.toastr.warning('Please fill in all required fields.');
    }
  }

  createEmployerAccount() {
    if (this.EmployerloginForm.valid) {
      const formData = this.EmployerloginForm.value;
      this.http.post('auth/signup', formData, false).subscribe(
        (res: any) => {
          this.currentTab = 'tab1';  // Switch to the login tab
        },
        (error: any) => {
          this.toastr.error('Signup failed. Please try again.');
        }
      );
    } else {
      this.toastr.warning('Please fill in all required fields.');
    }
  }

  loginCandidate() {
    this.http.post('auth/login', this.candidateLogin.value, false).subscribe(
      (res: any) => {
        console.log(res, "login response");
        localStorage.setItem('token', res?.token); // Save token to local storage
        localStorage.setItem('role', res?.role); // Save role to local storage
        this.closePopup(); // Close the popup after successful login
        window.location.reload();
      },
      (err: any) => {
        console.log(err.status, "sdfs");
        if (err.status == 403) {
          localStorage.setItem('email', this.candidateLogin.controls['email'].value);
          localStorage.setItem('role', this.candidateLogin.controls['role'].value);
        }
      }
    );
  }

  loginEmployer() {
    this.http.post('auth/login', this.employerLogin.value, false).subscribe(
      (res: any) => {
        console.log(res, "login response");
        localStorage.setItem('token', res?.token); // Save token to local storage
        localStorage.setItem('role', res?.role); // Save role to local storage
        this.closePopup(); // Close the popup after successful login
        window.location.reload();
      },
      (err: any) => {
        console.log(err.status, "sdfs");
        if (err.status == 403) {
          localStorage.setItem('email', this.employerLogin.controls['email'].value);
          localStorage.setItem('role', this.employerLogin.controls['role'].value);
        }
      }
    );
  }

 
}
