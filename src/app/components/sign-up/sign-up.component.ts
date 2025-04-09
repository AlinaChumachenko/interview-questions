import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  @Output() closeSignUpModal: EventEmitter<void> = new EventEmitter();

  closeSignUp() {
    this.closeSignUpModal.emit();
  }
}
