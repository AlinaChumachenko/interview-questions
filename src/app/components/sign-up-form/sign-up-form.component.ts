import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up-form',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.scss'
})
export class SignUpFormComponent {
  signUpForm: FormGroup;
  loading = false;
  @Output() authSuccess = new EventEmitter<void>();
    constructor(private fb: FormBuilder, private authService: AuthService) {
      
      this.signUpForm = this.fb.group({
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
    }
  
    onSubmit() {
      if (this.signUpForm.valid) {
        this.loading = true;
        const { username, email, password } = this.signUpForm.value;
        this.authService.signUp(username, email, password).subscribe({
          next: (response) => {
            console.log('User registered success', response);
            this.loading = false;
            this.authService.saveUserName(username);
            this.authSuccess.emit();
          },
          error: (error) => {
            console.error('Registration failed', error);
            this.loading = false;
          }
        })
      }
    }
  }
