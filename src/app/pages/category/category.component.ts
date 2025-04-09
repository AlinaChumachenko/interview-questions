import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { NgFor, NgIf } from '@angular/common';
import { Question } from '../../models/question.model';
import { MessageModalComponent } from '../../components/message-modal/message-modal.component';


@Component({
  selector: 'app-category',
  imports: [NgFor, MessageModalComponent, NgIf],
  standalone: true,
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})


export class CategoryComponent implements OnInit{

  
  category: string = '';
  questions: Question[] = [];
  showModal: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService
  
  ) { }

  ngOnInit(): void {        
        this.route.paramMap.subscribe((params) => {
        this.category = params.get('name')!;    
        this.categoryService.getQuestions(this.category).subscribe((data) => {
        this.questions = data;
      });
    });
  }
  toUpperCase(str: string): string {
    return str.toUpperCase();
  }

  openModal() {
    // if (!this.isLoggedIn) {
      this.showModal = true; // Показуємо модалку, якщо користувач не авторизований
    // }
  }

  closeModal() {
    this.showModal = false; // Закриваємо модалку
  }

}
