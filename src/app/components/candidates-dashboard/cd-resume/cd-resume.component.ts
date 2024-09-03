import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
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

  constructor(private fb: FormBuilder, private http: HttpService) {
    this.educationForm = this.fb.group({
      education: this.fb.array([this.createEducationFormGroup()]),
    });

    this.experienceForm = this.fb.group({
      experience: this.fb.array([this.createExperienceFormGroup()])
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
      const res: any = await this.http.get('auth/me', true).toPromise();
      console.log(res);
      
    } 
    catch (error) {
      console.error('Error fetching user profile:', error);
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
        const userId = this.id; // Assuming this.id holds the user_id
        const educationData = this.educationForm.value.education.map((edu: any) => ({
            ...edu,
            user_id: userId // Add user_id to each education entry
        }));

        const res = await this.http.post('education/create', { data: educationData }, true).toPromise();
        console.log(res);
    } catch (error) {
        console.error('Error creating education entries:', error);
    }
}

async ExperienceCreate() {
  try {
      const userId = this.id; // Assuming this.id holds the user_id
      const experienceData = this.experienceForm.value.experience.map((exp: any) => ({
          ...exp,
          user_id: userId // Add user_id to each education entry
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
    // Handle video submission
  }

  onSubmitEducation() {
    this.EducationCreate();
  }

  onSubmitExperience() {
    this.ExperienceCreate();
  }
}
