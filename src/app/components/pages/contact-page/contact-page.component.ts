import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent {

  title = 'Contact Us - Jove';
  submit:boolean = false;
  // Name = new FormControl('');

  ContactPageForm = new FormGroup({
    Name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    Email: new FormControl(null, [Validators.required, Validators.email]),
    phone: new FormControl(null, [Validators.required]),
    Subject: new FormControl(null, [Validators.required]),
    yourMessage: new FormControl(null, [Validators.required, Validators.minLength(10)]),
  })


  //   onSubmit() {
  //     // TODO: Use EventEmitter with form value
  //     console.warn(this.ContactPageForm.value);
  //   }

  onSubmit() {
    this.submit = true
    if (this.ContactPageForm.valid) {
      console.log(this.ContactPageForm.value);
    } else {
      console.log('Form is invalid');
    }
  }

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle(this.title);
  }

}