import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { HelperService } from 'src/app/shared/services/helper.service';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-cd-resume',
  templateUrl: './cd-resume.component.html',
  styleUrls: ['./cd-resume.component.scss']
})
export class CdResumeComponent implements OnInit {
  educationForm!: FormGroup;
  experienceForm!: FormGroup;
  personalDetailsForm!: FormGroup;
  videoUploadForm!: FormGroup;
  saveDetails: boolean = false;
  saveVideo: boolean = false;
  public id: any;

  constructor(private fb: FormBuilder, private http: HttpService, private helper: HelperService) {
    this.educationForm = this.fb.group({
      education: this.fb.array([])
    });

    this.experienceForm = this.fb.group({
      experience: this.fb.array([])
    });
    

    this.personalDetailsForm = this.fb.group({
      first_name: [null, [Validators.required, Validators.minLength(3)]],
      last_name: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email]],
      phone_number: [null, [Validators.required, Validators.pattern(/^[\+\d\s\(\)-]{10,}$/)]],
      dob: [null, Validators.required],
      gender: [null, Validators.required],
      maritalStatus: [null, Validators.required],
      nationality: [null, Validators.required],
      address: [null, Validators.required],
      user_id: [null]  // Initialize user_id as null
    });

    this.videoUploadForm = this.fb.group({
      video: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  get education(): FormArray {
    return this.educationForm.get('education') as FormArray;
  }

  createEducationFormGroup(): FormGroup {
    return this.fb.group({
      degree_name: ['', Validators.required],
      school: ['', Validators.required],
      start_year: ['', Validators.required],
      end_year: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  addEducationFormGroup(): void {
    this.education.push(this.createEducationFormGroup());
  }

  removeEducationFormGroup(index: number): void {
    if (this.education.length > 1) {
      this.education.removeAt(index);
    }
  }

  get experience(): FormArray {
    return this.experienceForm.get('experience') as FormArray;
  }

  createExperienceFormGroup(): FormGroup {
    return this.fb.group({
      position: [null, Validators.required],
      company_name: [null, Validators.required],
      start_year: ['', Validators.required],
      end_year: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  addExperienceFormGroup(): void {
    this.experience.push(this.createExperienceFormGroup());
  }

  removeExperienceFormGroup(index: number): void {
    if (this.experience.length > 1) {
      this.experience.removeAt(index);
    }
  }

  async loadData() {
    await this.getCandidateProfile();
  }

  async getCandidateProfile() {
    try {
      const res: any = await this.http.get('auth/me', true).toPromise();
      if (res && res.user) {
        this.id = res.user.id;
        this.personalDetailsForm.patchValue({
          ...res.user,
          ...res.user.dataValues,
          user_id: this.id  // Explicitly set the user_id in the form
        });
      }
    } 
    catch (error) {
      console.error('Error fetching user profile:', error);
    }
  
    try {
      const res: any = await this.http.get('experience/get_experience', true).toPromise();
      
      if (res && res.experiences) {
        const experienceArray = this.experienceForm.get('experience') as FormArray;
  
        // Clear any existing form groups in the FormArray
        while (experienceArray.length) {
          experienceArray.removeAt(0);
        }
  
        // Add the experiences from the API response
        res.experiences.forEach((exp: any) => {
          experienceArray.push(this.fb.group({
            position: [exp.position, Validators.required],
            company_name: [exp.company_name, Validators.required],
            start_year: [exp.start_year, Validators.required],
            end_year: [exp.end_year, Validators.required],
            description: [exp.description, Validators.required],
          }));
        });
      }
      
      console.log(res);
    } 
    catch (error) {
      console.error('Error fetching experience data:', error);
    }

    try {
      const res: any = await this.http.get('education/get_education', true).toPromise();
      
      if (res && res.education) {
        const educationArray = this.educationForm.get('education') as FormArray;
  
        while (educationArray.length) {
          educationArray.removeAt(0);
        }
  
        res.education.forEach((edu: any) => {
          educationArray.push(this.fb.group({
            degree_name: [edu.degree_name, Validators.required],
            school: [edu.school, Validators.required],
            start_year: [edu.start_year, Validators.required],
            end_year: [edu.end_year, Validators.required],
            description: [edu.description, Validators.required],
          }));
        });
      }
      
      console.log(res);
    } 
    catch (error) {
      console.error('Error fetching experience data:', error);
    }
  }
  

  async candidateUpdate() {
    try {
      this.personalDetailsForm.patchValue({ user_id: this.id });
      const res = await this.http.post('auth/update', this.personalDetailsForm.value, true).toPromise();
      console.log(res);
      this.getCandidateProfile();  // Refresh data after update
    } catch (error) {
      console.error('Error updating candidate profile:', error);
    }
  }

  async EducationCreate() {
    try {
        const userId = this.id; 
        const educationData = this.educationForm.value.education.map((edu: any) => ({
            ...edu,
            user_id: userId 
        }));

        const res = await this.http.post('education/create', { data: educationData }, true).toPromise();
        console.log(res);
    } catch (error) {
        console.error('Error creating education entries:', error);
    }
}

async ExperienceCreate() {
  try {
      const userId = this.id; 
      const experienceData = this.experienceForm.value.experience.map((exp: any) => ({
          ...exp,
          user_id: userId 
      }));

      const res = await this.http.post('experience/create-experience', { data: experienceData }, true).toPromise();
      console.log(res);
  } catch (error) {
      console.error('Error creating education entries:', error);
  }
}

  

  onSubmit(): void {
    this.candidateUpdate();
  }

  onSubmitVideo(): void {
    const fileInput = document.getElementById('video') as HTMLInputElement;
    const file = fileInput?.files?.[0];
    
    if (file) {
      this.helper
    .videoUploadHttp(file)
        .then((result: any) => {
          this.videoUploadForm.patchValue({
            video: result.data.video_url,
          });
          console.log(this.videoUploadForm.value);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.error('No file selected.');
    }
  }


  // onSubmitVideo(event: any) {
  //   this.helper
  //   .videoUploadHttp(event)
  //   .then((result: any) => {
  //     this.videoUploadForm.patchValue({
  //      video: result.data.video_url,
  //     });
  //     this.videoUploadForm.patchValue({
  //       ...this.videoUploadForm.value,
  //      video: result.data.video_url,
  //     });
  //     console.log(this.videoUploadForm.value);
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
  // }

  onSubmitEducation() {
    this.EducationCreate();
  }

  onSubmitExperience() {
    this.ExperienceCreate();
  }
}
