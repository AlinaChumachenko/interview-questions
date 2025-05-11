import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Category } from '../models/category.model';
// import { Question } from '../models/question.model';

export interface Question {
  id: string;
  question: string;
  answer: string;
  category: string;
  showAnswer?: boolean;
}
@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  
  private apiUrl = 'http://localhost:3000/api/questions';


  constructor(private http: HttpClient) { }
  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(this.apiUrl);
  }

  addQuestion(question: string, category: string): Observable<Question> {
    return this.http.post<Question>(this.apiUrl, { question, category });
  }

  deleteQuestion(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateAnswer(id: string, answer: string): Observable<Question> {
    return this.http.put<Question>(`${this.apiUrl}/${id}/answer`, { answer });
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('http://localhost:3000/api/categories');
  }

  addCategory(name: string): Observable<Category> {
    return this.http.post<Category>('http://localhost:3000/api/categories', { name });
  }

  deleteCategory(id: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/api/categories/${id}`);
  }
}