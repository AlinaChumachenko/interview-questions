import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SignUpFormComponent } from '../sign-up-form/sign-up-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignInFormComponent } from '../sign-in-form/sign-in-form.component';
// import { NgIf } from '@angular/common';

@Component({
  selector: 'app-sign-modal',
  imports: [SignUpFormComponent, SignInFormComponent, ReactiveFormsModule],
  standalone: true,
  templateUrl: './sign-modal.component.html',
  styleUrl: './sign-modal.component.scss'
})
export class SignModalComponent {
  @Input() title: string = '';  
  @Input() formType: string = '';
  @Output() closeModal: EventEmitter<void> = new EventEmitter();


  close() {
    this.closeModal.emit(); 
  }
}