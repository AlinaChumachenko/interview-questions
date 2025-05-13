import { Component, EventEmitter, Output } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-message-modal',
  imports: [TranslateModule,],
  standalone: true,
  templateUrl: './message-modal.component.html',
  styleUrl: './message-modal.component.scss'
})
export class MessageModalComponent {


  @Output() closeModal: EventEmitter<void> = new EventEmitter();

  constructor(
    
    private translate: TranslateService) {}

  close() {
    this.closeModal.emit();
  }
}
