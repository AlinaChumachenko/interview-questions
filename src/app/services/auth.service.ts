import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://your-api.com/api';
  private tokenKey = 'auth_token';
  private userKey = 'user_name'; 

  constructor(private http: HttpClient) { }

 

  signUp(username: string, email: string, password: string): Observable<any> {

    const fakeResponse = {token: 'fake-jwt-token', message: 'User registered successfully'};
    return of(fakeResponse).pipe(
      tap(response => {
        this.saveToken(response.token); 
        this.saveUserName(username);  
        this.saveUserRecord(email, username);  
      }))

    // return this.http.post(`${this.apiUrl}/register`, { username, email, password});
  }

  signIn(email: string, password: string): Observable<any> {
    const username = this.getUserNameByEmail(email);
    if(!username) {
      return new Observable(observer =>
        observer.error({message:'User not registered. Please sign up first.'})
      )
    }

    const fakeResponse = {token: 'fake-jwt-token', username: username};
    return of(fakeResponse).pipe(
      tap(response => 
        {this.saveToken(response.token);
        this.saveUserName(response.username);})

    );

    // return this.http.post(`${this.apiUrl}/login`, { email, password}).pipe(
    //   tap((response: any) => this.saveToken(response.token))
    // )
  }

  private saveUserRecord(email: string, username: string) {
    localStorage.setItem(`user_${email}`, username);
  } 

  private getUserNameByEmail(email: string): string | null {
    return localStorage.getItem(`user_${email}`);
  }

  private saveToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey); 
  }

  

saveUserName(username: string) {
  localStorage.setItem(this.userKey, username);
}

getUserName(): string | null {
  return localStorage.getItem(this.userKey);
}

getUserEromToken(): any {
  const token = this.getToken();
  if (!token) return null;

try {
  return jwtDecode(token);
} catch (error) {
  console.error('Invalid token', error);
  return null;
}}
}
     