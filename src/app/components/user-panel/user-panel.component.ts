import { Component } from '@angular/core';
import { SignInComponent } from '../sign-in/sign-in.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-user-panel',
  imports: [SignInComponent, SignUpComponent, NgIf  ],
  templateUrl: './user-panel.component.html',
  styleUrl: './user-panel.component.scss'
})
export class UserPanelComponent {
  showSignInModal: boolean = false;
  showSignUpModal: boolean = false;
openSignInModal() {
      this.showSignInModal = true; 
  }

  openSignUpModal() {
      this.showSignUpModal = true; 
  }

  closeSignInModal() {
    this.showSignInModal = false; 
  }
  closeSignUpModal() {
    this.showSignUpModal = false; 
  }


}
