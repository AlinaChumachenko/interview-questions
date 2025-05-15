import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService, Question } from '../../services/category.service';
import { CommonModule } from '@angular/common';
import { MessageModalComponent } from '../../components/message-modal/message-modal.component';
import { AuthService } from '../../services/auth.service';
import { AiService } from '../../services/ai.service';
import { AnswerModalComponent } from '../../components/answer-modal/answer-modal.component';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-category',
  imports: [
    CommonModule,
    MatIconModule,
    TranslateModule,
    AnswerModalComponent,
    MessageModalComponent],
  standalone: true,
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})

export class CategoryComponent implements OnInit, OnDestroy{
  
  category: string = '';
  questions: Question[] = [];
  showModal: boolean = false;
  showAnswerModal: boolean = false;
  selectedQuestion: Question | null = null;
  aiAnswer: string = '';
  newQuestionText = '';
  confirmDeleteId: string | null = null;
  currentLang: string = 'en';
  isLoading: boolean = false;
  private subscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private authService: AuthService,
    private router: Router,
    private aiService: AiService,
    private translate: TranslateService) {}

  ngOnInit(): void {      
    
    this.currentLang = localStorage.getItem('lang') || this.translate.getDefaultLang() || 'en';
    
    this.subscription.add(
      this.route.paramMap.subscribe((params) => {
        const name = params.get('name');
        if (!name) {
          this.router.navigate(['/home']);
          return;
        }
        this.category = name;
        this.loadQuestions();
      })
    ); 
    
    this.subscription.add(
      this.categoryService.onCategoryDeleted().subscribe(() => {
        this.categoryService.getCategories().subscribe((categories) => {
          if (!categories.find((c) => c.name === this.category)) {
            this.questions = []; // Очищаємо питання
            this.router.navigate(['/home']); // Перенаправляємо
          }
        });
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // Очищаємо підписки
  }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  loadQuestions() {
    this.isLoading = true; // Починаємо завантаження
    this.categoryService.getCategories().subscribe(
      (categories) => {
        if (!categories.find((c) => c.name === this.category)) {
          this.questions = [];
          this.router.navigate(['/home']);
          this.isLoading = false;
          return;
        }
    const storedStates = JSON.parse(localStorage.getItem('answerStates') || '{}');
    this.categoryService.getQuestions().subscribe((data) => {
      this.questions = data
      .filter(q => q.category === this.category)
      .map(q => ({
        ...q,
        question: this.currentLang === 'uk' ? q.question_uk : q.question_en,
        answer: this.currentLang === 'uk' ? q.answer_uk : q.answer_en,
        showAnswer: !!(this.currentLang === 'uk' ? q.answer_uk : q.answer_en) // true, якщо відповідь є
      }));
      this.isLoading = false;
    },
    () => {
      this.isLoading = false;
    }
  );
},
() => {
  this.isLoading = false;
}
);
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
  
      this.categoryService.updateAnswer(questionToUpdate.id, answer, this.currentLang)
  .subscribe({
    next: (updatedQuestion) => {
      questionToUpdate.answer = answer; // <- це поле для UI
      if (this.currentLang === 'en') {
        questionToUpdate.answer_en = answer;
      } else {
        questionToUpdate.answer_uk = answer;
      }
      this.closeAnswerModal(); 
    },
    error: (err) => {
      console.error('Update answer error:', err);
    }
  });
    }
  }

  addQuestion() {
    if (!this.newQuestionText.trim()) return;
  
    const payload: any = {
      category: this.category
    };
  
    if (this.currentLang === 'uk') {
      payload.question_uk = this.newQuestionText.trim();
      payload.question_en = '';
    } else {
      payload.question_en = this.newQuestionText.trim();
      payload.question_uk = '';
    }
   // console.log('Payload:', payload);
  
    this.categoryService.addQuestion(payload).subscribe({
      next: (q) => {
        this.questions.unshift({
          ...q,
          question: this.currentLang === 'uk' ? q.question_uk : q.question_en,
          answer: this.currentLang === 'uk' ? q.answer_uk : q.answer_en,
          showAnswer: false
        });
        this.newQuestionText = '';
      },
      error: (err) => {
        console.error('Add question error:', err);
      }
    });
  }
  
  
  deleteConfirmed() {
    if (!this.confirmDeleteId) return;
  
    this.categoryService.deleteQuestion(this.confirmDeleteId).subscribe(() => {
      this.questions = this.questions.filter(q => q.id !== this.confirmDeleteId);
      this.confirmDeleteId = null;
    });
  }

  generateAnswer(question: Question) {

    if (!question.question) return;
    this.aiService.generateAnswer(question.question).subscribe((res) => {
      
      this.showAnswerModal = true;
    })
  }

  switchLang(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
    this.currentLang = lang;
    this.loadQuestions(); 
  }
  

}
