import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in-form',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './sign-in-form.component.html',  
  styleUrl: './sign-in-form.component.scss'
})
export class SignInFormComponent {
  signInForm: FormGroup;
  loading = false;
  @Output() authSuccess = new EventEmitter<void>();
  constructor(private fb: FormBuilder, private authService: AuthService) {
    
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
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
          console.error('Login failed', error);
          alert(error.message);
          this.loading = false;
        }
      })
     
    }
  }
}

