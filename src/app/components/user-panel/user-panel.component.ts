import { Component } from '@angular/core';
import { SignModalComponent } from '../sign-modal/sign-modal.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-panel',
  imports: [SignModalComponent],
  standalone: true,
  templateUrl: './user-panel.component.html',
  styleUrl: './user-panel.component.scss'
})
export class UserPanelComponent {
  
  showModal: boolean = false;
  modalTitle: string = '';
  formType: string = '';

  constructor(public authService: AuthService) {}
   
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
