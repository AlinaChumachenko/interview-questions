import { Component } from '@angular/core';
import { SignModalComponent } from '../sign-modal/sign-modal.component';
import { AuthService } from '../../services/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-panel',
  imports: [TranslateModule, SignModalComponent],
  standalone: true,
  templateUrl: './user-panel.component.html',
  styleUrl: './user-panel.component.scss'
})
export class UserPanelComponent {
  
  showModal: boolean = false;
  modalTitle: string = '';
  formType: string = '';

  constructor(
    public authService: AuthService,
    private translate: TranslateService ) {}
   
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
