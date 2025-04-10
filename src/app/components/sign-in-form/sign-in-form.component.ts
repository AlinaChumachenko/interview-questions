import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in-form',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-in-form.component.html',
  standalone: true,
  styleUrl: './sign-in-form.component.scss'
})
export class SignInFormComponent {
  signInForm: FormGroup;
  constructor(private fb: FormBuilder) {
    
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  onSubmit() {
    if (this.signInForm.valid) {
      console.log('Form submitted', this.signInForm.value);
    }
  }
}

