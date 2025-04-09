import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Question } from '../models/question.model';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private dataUrl = 'assets/data/questions.json';


  constructor(private http: HttpClient) { }
  getQuestions(category: string): Observable<Question[]> {
    return this.http.get<{ [key: string]: Question[] }>(this.dataUrl)
      .pipe(map(data => data[category] || []));
  }
} 
