import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up-form',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.scss'
})
export class SignUpFormComponent {

  signUpForm: FormGroup;

    constructor(private fb: FormBuilder) {
      
      this.signUpForm = this.fb.group({
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
    }
  
    onSubmit() {
      if (this.signUpForm.valid) {
        console.log('Form submitted', this.signUpForm.value);
      }
    }
  }
