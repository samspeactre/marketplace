
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

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
  saveDetails: boolean=false;
  saveVideo: boolean =false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.educationForm = this.fb.group({
      education: this.fb.array([this.createEducationFormGroup()]), // Default one entry
    });
    this.experienceForm = this.fb.group({
      experience: this.fb.array([this.createExperienceFormGroup()]) // Default one entry
    });

    this.personalDetailsForm = this.fb.group({
      firstName: [null, [Validators.required, Validators.minLength(3)]],
      lastName: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required, Validators.pattern(/^[\+\d\s\(\)-]{10,}$/)]], // Example pattern
      dateOfBirth: [null, Validators.required],
      gender: [null, Validators.required],
      maritalStatus: [null, Validators.required],
      nationality: [null, Validators.required],
      address: [null, Validators.required]
    });

    this.videoUploadForm=this.fb.group({
      video:[null,[Validators.required]]
    })
  }

  // Getter for Education FormArray
  get education(): FormArray {
    return this.educationForm.get('education') as FormArray;
  }

  // Method to create a new education form group
  createEducationFormGroup(): FormGroup {
    return this.fb.group({
      degreeName: ['', Validators.required],
      universityName: ['', Validators.required],
      fromYear: ['', Validators.required],
      toYear: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  // Method to add a new education form group
  addEducationFormGroup(): void {
    this.education.push(this.createEducationFormGroup());
  }

  // Method to remove an education form group
  removeEducationFormGroup(index: number): void {
    if (this.education.length > 1) {
      this.education.removeAt(index);
    }
  }

  // Getter for Experience FormArray
  get experience(): FormArray {
    return this.experienceForm.get('experience') as FormArray;
  }

  // Method to create a new experience form group
  createExperienceFormGroup(): FormGroup {
    return this.fb.group({
      position: [null, Validators.required],
      companyName: [null, Validators.required],
      fromYear: [null, Validators.required],
      toYear: [null, Validators.required],
      description: [null, Validators.required]
    });
  }

  // Method to add a new experience form group
  addExperienceFormGroup(): void {
    this.experience.push(this.createExperienceFormGroup());
  }

  // Method to remove an experience form group
  removeExperienceFormGroup(index: number): void {
    if (this.experience.length > 1) {
      this.experience.removeAt(index);
    }
  }

  // Method to handle form submission
  onSubmit(): void {

  }

  onSubmitVideo(): void {

  }

  onSubmitEducation() {

  }
}
