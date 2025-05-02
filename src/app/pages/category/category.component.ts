import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService, Question } from '../../services/category.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
// import { Question } from '../../models/question.model';
import { MessageModalComponent } from '../../components/message-modal/message-modal.component';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-category',
  imports: [NgFor, MessageModalComponent, NgIf, CommonModule],
  standalone: true,
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})


export class CategoryComponent implements OnInit{

  
  category: string = '';
  questions: Question[] = [];
  showModal: boolean = false;
  newQuestionText = '';

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private authService: AuthService,
  
  ) { }

  ngOnInit(): void {        
        this.route.paramMap.subscribe((params) => {
        this.category = params.get('name')!;    
        this.loadQuestions();
      });    
  }

  loadQuestions() { 
    this.categoryService.getQuestions().subscribe((data) =>{
      this.questions = data.filter(q => q.category === this.category)
    });
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

  addQuestion() {

    if (!this.newQuestionText.trim()) return;
     this.categoryService.addQuestion(this.newQuestionText, this.category).subscribe((q) => {
      this.questions.unshift(q);
      this.newQuestionText = '';
     })

  }
  
  deleteQuestion(id: string) {
    this.categoryService.deleteQuestion(id).subscribe(() => {
      this.questions = this.questions.filter(q => q.id !== id);
    });
  }
  

}
