import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-cd-resume',
  templateUrl: './cd-resume.component.html',
  styleUrls: ['./cd-resume.component.scss']
})
export class CdResumeComponent implements OnInit {
  mainForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.mainForm = this.fb.group({
      // Career/Application Section
      objective: [''],
      presentSalary: [''],
      expectedSalary: [''],
      jobLevel: [''],
      jobType: [''],
      additionalForms: this.fb.array([]),  // For dynamic career/application sections

      // Education Section
      eductionLevel: [''],
      degreeTitle: [''],
      majorGroup: [''],
      instituteName: [''],
      result: [''],
      marks: [''],
      yearPass: [''],
      durationYears: [''],
      additionalEducationForms: this.fb.array([]),  // For dynamic education sections


      // Experience Section
      companyName: [''],
      companyBusiness: [''],
      designation: [''],
      department: [''],
      responsibilities: [''],
      companyLocation: [''],
      employmentPeriod: [''],
      experiences: this.fb.array([])
    });
  }

  // Getters for FormArrays
  get additionalForms(): FormArray {
    return this.mainForm.get('additionalForms') as FormArray;
  }

  get additionalEducationForms(): FormArray {
    return this.mainForm.get('additionalEducationForms') as FormArray;
  }

  get experiences(): FormArray {
    return this.mainForm.get('experiences') as FormArray;
  }

  // Method to add a new dynamic form group to the Career/Application section
  addForm(): void {
    this.additionalForms.push(this.fb.group({
      objective: [''],
      presentSalary: [''],
      expectedSalary: [''],
      jobLevel: [''],
      jobType: ['']
    }));
  }

  // Method to remove a dynamic form group from the Career/Application section
  removeForm(index: number): void {
    this.additionalForms.removeAt(index);
  }

  // Method to handle Career/Application form submission
  onSubmit(): void {
    console.log('Career/Application Form Submitted', this.mainForm.value);
    // Handle form submission logic here
  }



  // Method to add a new dynamic form group to the Education section
  addEducationForm(): void {
    this.additionalEducationForms.push(this.fb.group({
      eductionLevel: [''],
      degreeTitle: [''],
      majorGroup: [''],
      instituteName: [''],
      result: [''],
      marks: [''],
      yearPass: [''],
      durationYears: ['']
    }));
  }

  // Method to remove a dynamic form group from the Education section
  removeEductionForm(index: number): void {
    this.additionalEducationForms.removeAt(index);
  }

  onEductionSubmit(): void {
    console.log('Education Form Submitted', this.mainForm.value);
    // Handle form submission logic here
  }


  // Method to add a new dynamic form group to the Experience section
  addExperienceForm(): void {
    this.experiences.push(this.fb.group({
      companyName: ['', Validators.required],
      companyBusiness: ['', Validators.required],
      designation: ['', Validators.required],
      department: ['', Validators.required],
      responsibilities: ['', Validators.required],
      companyLocation: ['', Validators.required],
      employmentPeriod: ['', Validators.required]
    }));
  }

  // Method to remove a dynamic form group from the Experience section
  removeExperienceForm(index: number): void {
    this.experiences.removeAt(index);
  }

  // Method to handle Career/Application form submission
  onExperienceSubmit(): void {
    console.log('Form Submitted', this.mainForm.value);
    // Handle form submission logic here
  }
}
