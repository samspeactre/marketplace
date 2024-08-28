import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-ed-company-profile',
  templateUrl: './ed-company-profile.component.html',
  styleUrls: ['./ed-company-profile.component.scss']
})
export class EdCompanyProfileComponent {
  save: boolean = false;
  saveSocialMedia: boolean= false;
  saveContact: boolean=false;

  companyProfile = new FormGroup({
    uploadPic : new FormControl(null, [Validators.required]),
    companyName:new FormControl(null,[Validators.required, Validators.minLength(5)]),
    email: new FormControl(null,[Validators.required, Validators.email]),
    phone: new FormControl(null,[Validators.required, Validators.pattern('^[0-9]{10}$') ]),
    website: new FormControl(null,[Validators.required, Validators.pattern('https?://.+') ]),
    since: new FormControl(null,[Validators.required]),
    teamSize: new FormControl(null,[Validators.required]),
    category: new FormControl(null,[Validators.required]),
    allowSearchListing: new FormControl(null,[Validators.required]),
    aboutCompany: new FormControl(null,[Validators.required, Validators.minLength(10)]),
  })

  saveFunction() {
    this.save = true;
    if (this.companyProfile.valid) {
      console.log(this.companyProfile.value);
    } else {
      console.log('Form is invalid');
    }
}


  SocialNetwork = new FormGroup({
    facebook: new FormControl(null,[Validators.required]),
    twitter: new FormControl(null,[Validators.required]),
    linkedin: new FormControl(null,[Validators.required]),
    instagram: new FormControl(null,[Validators.required])
  })


  saveFunctionSocialMedia() {
    this.saveSocialMedia = true;
    if (this.SocialNetwork.valid) {
      console.log(this.SocialNetwork.value);
    } else {
      console.log('Form is invalid');
    }
  }

  contactInformation= new FormGroup({
    country:  new FormControl(null,[Validators.required]),
    city: new FormControl(null,[Validators.required]),
    completeAddress: new FormControl(null,[Validators.required]),
    latitude: new FormControl(null, [Validators.required]),
    longitude: new FormControl(null,[Validators.required])
  })

  saveContactFunction(){
    this.saveContact = true;
    if (this.contactInformation.valid) {
      console.log(this.contactInformation.value);
    } else {
      console.log('Form is invalid');
    }
  }


}
