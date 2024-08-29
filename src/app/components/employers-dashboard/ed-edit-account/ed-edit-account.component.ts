import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-ed-edit-account',
  templateUrl: './ed-edit-account.component.html',
  styleUrl: './ed-edit-account.component.scss'
})
export class EdEditAccountComponent {
saveEmployee:boolean=false;

employeeInformation = new FormGroup({
  firstName: new FormControl(null,[Validators.required]),
  lastName: new FormControl(null,[Validators.required]),
  username: new FormControl(null,[Validators.required]),
  phone: new FormControl(null,[Validators.required]),
  password: new FormControl(null,[Validators.required]),
  confirmPassword: new FormControl(null,[Validators.required])
})

saveEmployeeFunction() {
  this.saveEmployee = true;
  if (this.employeeInformation.valid) {
    console.log(this.employeeInformation.value);
  } else {
    console.log('Form is invalid');
  }
}



}
