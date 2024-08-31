import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { HelperService } from 'src/app/shared/services/helper.service';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-ed-company-profile',
  templateUrl: './ed-company-profile.component.html',
  styleUrls: ['./ed-company-profile.component.scss']
})
export class EdCompanyProfileComponent {
  save: boolean = false;
  saveSocialMedia: boolean= false;
  saveContact: boolean=false;


  constructor(private fb: FormBuilder, private http: HttpService, private helper: HelperService) {}
  ngOnInit() {
    this.getCompnayProfile(); // Call getCompnayProfile directly
  }
  
  async loadData() {
    await Promise.all([this.getCompnayProfile()]);
  }

  companyProfile = new FormGroup({
    main_logo : new FormControl(null, [Validators.required]),
    company_name:new FormControl(null,[Validators.required, Validators.minLength(5)]),
    email: new FormControl(null,[Validators.required, Validators.email]),
    phone_number: new FormControl(null,[Validators.required, Validators.pattern('^[0-9]{10}$') ]),
    website: new FormControl(null,[Validators.required, Validators.pattern('https?://.+') ]),
    since: new FormControl(null,[Validators.required]),
    team_size: new FormControl(null,[Validators.required]),
    category: new FormControl(null,[Validators.required]),
    allow_in_search: new FormControl(null,[Validators.required]),
    about_company: new FormControl(null,[Validators.required, Validators.minLength(10)]),
    facebook: new FormControl(null,[Validators.required]),
    twitter: new FormControl(null,[Validators.required]),
    linkedin: new FormControl(null,[Validators.required]),
    instagram: new FormControl(null,[Validators.required])
  })

  saveFunction() {
    this.save = true;
    if (this.companyProfile.valid) {
      console.log(this.companyProfile.value);
    } else {
      console.log('Form is invalid');
    }
}


  // SocialNetwork = new FormGroup({
  //   facebook: new FormControl(null,[Validators.required]),
  //   twitter: new FormControl(null,[Validators.required]),
  //   linkedin: new FormControl(null,[Validators.required]),
  //   instagram: new FormControl(null,[Validators.required])
  // })


  // saveFunctionSocialMedia() {
  //   this.saveSocialMedia = true;
  //   if (this.SocialNetwork.valid) {
  //     console.log(this.SocialNetwork.value);
  //   } else {
  //     console.log('Form is invalid');
  //   }
  // }

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


  async getCompnayProfile() {
    try {
      const res: any = await this.http.get('auth/me', true).toPromise();
      this.companyProfile.patchValue(res?.user);
      this.companyProfile.patchValue(res?.user?.dataValues);

    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }


  onLogoSelected(event: any) {
    this.helper.fileUploadHttp(event)
      .then((result: any) => {
        this.companyProfile.patchValue({
          main_logo: result.data.fileUrls, // Assuming result.data.fileUrls is the URL of the uploaded image
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  
  


}
