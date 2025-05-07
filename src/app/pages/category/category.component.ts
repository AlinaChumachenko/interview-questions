import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService, Question } from '../../services/category.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MessageModalComponent } from '../../components/message-modal/message-modal.component';
import { AuthService } from '../../services/auth.service';
import { AiService } from '../../services/ai.service';
import { AnswerModalComponent } from '../../components/answer-modal/answer-modal.component';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-category',
  imports: [
    NgFor, 
    NgIf,
    MatIconModule, 
    CommonModule,
    AnswerModalComponent,
    MessageModalComponent],
  standalone: true,
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})


export class CategoryComponent implements OnInit{

  
  category: string = '';
  questions: Question[] = [];
  showModal: boolean = false;
  showAnswerModal: boolean = false;
  selectedQuestion: Question | null = null;
  aiAnswer: string = '';
  newQuestionText = '';
  confirmDeleteId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private authService: AuthService,
    private aiService: AiService,
  
  ) {}

  ngOnInit(): void {        
      // this.isAuthenticated = this.authService.isAuthenticated();
        this.route.paramMap.subscribe((params) => {
        this.category = params.get('name')!;    
        this.loadQuestions();
      });    
  }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  loadQuestions() {
    const storedStates = JSON.parse(localStorage.getItem('answerStates') || '{}');
    this.categoryService.getQuestions().subscribe((data) => {
      this.questions = data
        .filter(q => q.category === this.category)
        .map(q => ({ ...q, showAnswer:storedStates[q.id] ?? false }));
    });
  }

  toggleAnswer(question: Question) {
    question.showAnswer = !question.showAnswer;
    const storedStates = JSON.parse(localStorage.getItem('answerStates') || '{}');
    storedStates[question.id] = question.showAnswer;
    localStorage.setItem('answerStates', JSON.stringify(storedStates));

  }
  toUpperCase(str: string): string {
    return str.toUpperCase();
  }

  openModal() {
    if(!this.authService.isAuthenticated()) {
      this.showModal = true;
    }
 }

  closeModal() {
    this.showModal = false;
  }

  openAnswerModal(question: Question) {
    this.selectedQuestion = question;
    this.showAnswerModal = true;
    
 }

  closeAnswerModal() {
    this.showAnswerModal = false;
    this.selectedQuestion = null;
  }

  onAnswerSubmitted(answer: string) {
    if (this.selectedQuestion) {
      const questionToUpdate = this.selectedQuestion; 
  
      this.categoryService.updateAnswer(questionToUpdate.id, answer).subscribe((updatedQuestion) => {
        questionToUpdate.answer = updatedQuestion.answer;
        this.closeAnswerModal(); 
      });
    }
  }

  addQuestion() {

    if (!this.newQuestionText.trim()) return;
     this.categoryService.addQuestion(this.newQuestionText, this.category).subscribe((q) => {
      this.questions.unshift(q);
      this.newQuestionText = '';
     })

  }
  
  deleteConfirmed() {
    if (!this.confirmDeleteId) return;
  
    this.categoryService.deleteQuestion(this.confirmDeleteId).subscribe(() => {
      this.questions = this.questions.filter(q => q.id !== this.confirmDeleteId);
      this.confirmDeleteId = null;
    });
  }

  generateAnswer(question: Question) {
    this.aiService.generateAnswer(question.question).subscribe((res) => {
      // this.aiAnswer = res.answer;
      this.showAnswerModal = true;
    })
  }
  

}
