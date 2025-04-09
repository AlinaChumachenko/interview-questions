import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { SignModalComponent } from '../sign-modal/sign-modal.component';

@Component({
  selector: 'app-user-panel',
  imports: [
    SignModalComponent,
    NgIf],
  templateUrl: './user-panel.component.html',
  styleUrl: './user-panel.component.scss'
})
export class UserPanelComponent {
  
  showModal: boolean = false;
  modalTitle: string = '';
  modalContent: string = '';

  openModal(type: string) {
    this.showModal = true;
    if (type === 'signIn') {
      this.modalTitle = 'Sign In';
      this.modalContent = 'Please enter your credentials to sign in.';
    } else if (type === 'signUp') {
      this.modalTitle = 'Sign Up';
      this.modalContent = 'Please enter your details to sign up.';
    }
  }

  closeModal() {
    this.showModal = false; 
  }

}
