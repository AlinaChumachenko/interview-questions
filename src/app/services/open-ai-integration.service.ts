import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OpenAiIntegrationService {
  private apiUrl = environment.apiUrl;
  private apiKey = environment.apiKey;

  
  constructor(private http: HttpClient) {}

  generateAnswerForQuestion(question: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
    });

    const systemPrompt = 'Згенеруй мені відповідь для наступного запитання: ';

    const body = {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: question,
        },
      ],
    };

    return this.http.post(this.apiUrl, body, { headers }).pipe(
      map((response: any) => {
        return response.choices[0].message.content;
      })
    );
  }
}