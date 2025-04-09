import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sign-modal',
  templateUrl: './sign-modal.component.html',
  styleUrl: './sign-modal.component.scss'
})
export class SignModalComponent {
  @Input() title: string = ''; // Заголовок
  @Input() content: string = ''; // Вміст (можна використовувати для опису форми або іншої інформації)
  @Output() closeModal: EventEmitter<void> = new EventEmitter();

  close() {
    this.closeModal.emit(); // Закриваємо модалку
  }
}