import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AiService } from  '../../services/ai.service';
import { FormsModule } from '@angular/forms';
import { Question } from '../../services/category.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-answer-modal',
  imports: [FormsModule, TranslateModule],
  standalone: true,
  templateUrl: './answer-modal.component.html',
  styleUrl: './answer-modal.component.scss'
})
export class AnswerModalComponent implements OnInit {
  @Input() answer: string = '';
  @Input() question!: Question;
  @Output() closeModal = new EventEmitter<void>();
  @Output() onAnswerSubmitted = new EventEmitter<string>();

  aiAnswer: string ='';
  manualAnswer: string = '';
  aiAnswerGenerated: boolean = false;

  constructor(
    private aiService: AiService,    
    private translate: TranslateService) {}   

  ngOnInit() {
    if (this.question?.answer) {
      this.manualAnswer = this.question.answer;
      this.aiAnswerGenerated = false;
    }
  }
  generateWithAI() {
    if (!this.question.question) return;
  this.aiService.generateAnswer(this.question.question).subscribe((res)=>{
    this.aiAnswer = res.answer;
    this.aiAnswerGenerated = true
  });
  }

  confirmAIAnswer() {
    this.onAnswerSubmitted.emit(this.aiAnswer);
    this.close();
  }

  submitManualAnswer() {
    if (this.manualAnswer.trim()) {
      this.onAnswerSubmitted.emit(this.manualAnswer);
      this.close();
    }
  }

  close() {
    this.closeModal.emit();   
  }

}
