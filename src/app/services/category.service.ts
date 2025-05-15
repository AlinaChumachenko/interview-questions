import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { Category } from '../models/category.model';
// import { Question } from '../models/question.model';

export interface Question {
  id: string; 
  category: string;
  question_en: string;
  question_uk: string;
  answer_en?: string;
  answer_uk?: string;
  showAnswer?: boolean;
  question?: string;
  answer?: string;
}
@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  private categoryDeleted = new Subject<string>();
  
  private apiUrl = 'http://localhost:3000/api';


  constructor(private http: HttpClient) { }
  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiUrl}/questions`); 
    }

  addQuestion(payload: {
    question_en?: string,
    question_uk?: string,
    category: string
  }) {
    return this.http.post<Question>(`${this.apiUrl}/questions`, payload);
  }
  deleteQuestion(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/questions/${id}`);
  }

  updateAnswer(id: string, answer: string, lang: string): Observable<Question> {
    return this.http.put<Question>(`${this.apiUrl}/questions/${id}/answer`, { answer, lang });
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('http://localhost:3000/api/categories');
  }

  addCategory(name: string): Observable<Category> {
    return this.http.post<Category>('http://localhost:3000/api/categories', { name });
  }

  deleteCategory(id: string): Observable<void> {
    return new Observable((observer) => {
      this.http.delete(`${this.apiUrl}/categories/${id}`).subscribe({
        next: () => {
          this.categoryDeleted.next(id); // Сповіщаємо про видалення
          observer.next();
          observer.complete();
        },
        error: (err) => {
          observer.error(err);
        },
      });
    });
  }

  // Метод для підписки на видалення категорії
  onCategoryDeleted(): Observable<string> {
    return this.categoryDeleted.asObservable();
  }
}