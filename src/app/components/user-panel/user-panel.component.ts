import { Component } from '@angular/core';
import { SignModalComponent } from '../sign-modal/sign-modal.component';

@Component({
  selector: 'app-user-panel',
  imports: [SignModalComponent],
  templateUrl: './user-panel.component.html',
  styleUrl: './user-panel.component.scss'
})
export class UserPanelComponent {
  
  showModal: boolean = false;
  modalTitle: string = '';
  formType: string = '';
   

  // openModal(type: string) {
  //   this.showModal = true;
  //   this.formType = type;
  //   if (type === 'signIn') {
  //     this.modalTitle = 'Sign In';
      
  //   } else if (type === 'signUp') {
  //     this.modalTitle = 'Sign Up';
     
  //   }

  openModal(type: string) {
    this.showModal = true;
    this.formType = type;
    this.modalTitle = type === 'signIn' ? 'Sign In' : 'Sign Up';
  }
  

  closeModal() {
    this.showModal = false; 
    this.modalTitle = '';
    this.formType = '';
  }

}
