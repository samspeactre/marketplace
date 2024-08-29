import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-ed-post-a-new-job',
  templateUrl: './ed-post-a-new-job.component.html',
  styleUrls: ['./ed-post-a-new-job.component.scss']
})


export class EdPostANewJobComponent {
  next: boolean = false;

  constructor( private http: HttpService,) {}


  // Custom Validator for dropdowns
  dropdownValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value && control.value !== '-1' ? null : { invalidDropdown: true };
    };
  }

  // Custom Validator for latitude
  latitudeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const lat = control.value;
      return lat >= -90 && lat <= 90 ? null : { invalidLatitude: true };
    };
  }

  // Custom Validator for longitude
  longitudeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const lon = control.value;
      return lon >= -180 && lon <= 180 ? null : { invalidLongitude: true };
    };
  }

  //Date Validator
  dateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const dateValue = control.value;
      const date = new Date(dateValue);
    
      if (isNaN(date.getTime())) {
        return { invalidDate: true };
      }
      const today = new Date();
      if (date < today) {
        return { pastDate: true };
      }
      return null; 
    };
  }

  postJobForm = new FormGroup({
    title: new FormControl(null, [Validators.required, Validators.minLength(5)]),
    description: new FormControl(null, [Validators.required, Validators.minLength(10)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    username: new FormControl(null, [Validators.required, Validators.minLength(4)]),
    specialism: new FormControl(null, [Validators.required,this.dropdownValidator()]),    //dropdown
    category_id: new FormControl(null, [Validators.required,this.dropdownValidator()]),    //dropdown
    jobType: new FormControl(null, [Validators.required, this.dropdownValidator()]),       //dropdown
    salary: new FormControl(null, [Validators.required, this.dropdownValidator()]), //dropdown
    careerLevel: new FormControl(null, [Validators.required, this.dropdownValidator()]),   //dropdown
    experience: new FormControl(null, [Validators.required, this.dropdownValidator()]),    //dropdown
    gender: new FormControl(null, [Validators.required, this.dropdownValidator()]),        //dropdown
    industry: new FormControl(null, [Validators.required, this.dropdownValidator()]),      //dropdown
    qualification: new FormControl(null, [Validators.required, this.dropdownValidator()]), //dropdown
    deadline: new FormControl(null, [Validators.required,this.dateValidator()]),
    country: new FormControl(null, [Validators.required ,this.dropdownValidator()]),       //dropdown
    city: new FormControl(null, [Validators.required, this.dropdownValidator()]),          //dropdown
    completeAddress: new FormControl(null, [Validators.required, Validators.minLength(10)]),
    latitude: new FormControl(null, [Validators.required,  this.latitudeValidator()]),
    longitude: new FormControl(null, [Validators.required, this.longitudeValidator()]),
    company: new FormControl('hello')

  })

    nextFunction() {
      this.next = true;
      if (this.postJobForm.valid) {
        console.log(this.postJobForm.value);
      } else {
        console.log('Form is invalid');
      }
  }

  async jobPost() {
    this.next = true;

    if (this.postJobForm.valid) {
    await this.http.post('jobs/create', this.postJobForm.value, true).subscribe((res: any) => {
        this.postJobForm.reset();
      });
    } else {
      console.log(this.postJobForm.value, 'Form is invalid');
    }
  }


}
