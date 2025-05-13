import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../../services/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-sign-in-form',
  imports: [ReactiveFormsModule, MatIconModule, TranslateModule],
  standalone: true,
  templateUrl: './sign-in-form.component.html',  
  styleUrl: './sign-in-form.component.scss'
})
export class SignInFormComponent {
  signInForm: FormGroup;
  loading = false;
  showPassword = false;
  @Output() authSuccess = new EventEmitter<void>();
  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private toastr: ToastrService,
    private translate: TranslateService) {
      
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.signInForm.valid) {
      this.loading = true;
      const { email, password } = this.signInForm.value;
      this.authService.signIn(email, password).subscribe({
        next:(response) =>{
          console.log('Login success', response);
          this.loading = false;
          this.authSuccess.emit();
        },
        error:(error) => {
          this.loading = false;

          if (error.status === 401) {
            this.toastr.error('User not found or incorrect password', 'Login Error');
          } else {
            this.toastr.error('An unexpected error occurred. Please try again later.', 'Error');
          }
        }
      })
     
    }
  }
}

