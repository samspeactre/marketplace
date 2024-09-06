import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-reset-otp',
  templateUrl: './reset-otp.component.html',
  styleUrl: './reset-otp.component.scss'
})
export class ResetOtpComponent {

  @ViewChildren('otpInput') inputs!: QueryList<ElementRef>;
  email: string = "user@example.com";  // Simulating an email for demonstration
  otp: string[] = ['', '', '', ''];

  ngAfterViewInit() {
    this.inputs.first.nativeElement.focus();
  }

  resendOTP() {
    alert("New OTP sent!");
    this.otp = ['', '', '', ''];
    this.inputs.forEach(input => {
      input.nativeElement.value = '';
      input.nativeElement.disabled = false;
    });
    this.inputs.first.nativeElement.focus();
  }

  onInputChange(event: any, index: number) {
    const inputValue = event.target.value;
    if (inputValue.length > 1) {
      event.target.value = inputValue.slice(0, 1);
    }
    this.otp[index] = event.target.value;
    if (inputValue.length === 1 && index < this.inputs.length - 1) {
      this.inputs.get(index + 1)?.nativeElement.focus();
    }
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace' && !this.otp[index]) {
      if (index > 0) {
        this.inputs.get(index - 1)?.nativeElement.focus();
      }
    }
    if (event.key === 'e') {
      event.preventDefault();
    }
  }

  verifyOTP() {
    const otp = this.otp.join('');
    if (otp.length === 4) {
      alert(`Verifying OTP: ${otp}`);
    } else {
      alert('Please enter a 4-digit OTP');
    }
  }

}
