import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-message-modal',
  imports: [],
  standalone: true,
  templateUrl: './message-modal.component.html',
  styleUrl: './message-modal.component.scss'
})
export class MessageModalComponent {
  @Output() closeModal: EventEmitter<void> = new EventEmitter();

  close() {
    this.closeModal.emit();
  }
}
