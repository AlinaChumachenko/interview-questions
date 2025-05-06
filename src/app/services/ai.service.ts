import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AiService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  generateAnswer(question: string): Observable<{answer: string}> {
    return this.http.post<{ answer: string }>(`${this.apiUrl}/ai-answer`, { question });
  }
}
