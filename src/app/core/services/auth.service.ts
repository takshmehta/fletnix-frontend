import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiBaseUrl}auth`;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<{ token: string }>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((response) => {
          localStorage.setItem('token', response.token);
        })
      );
  }

  register(email: string, password: string, age: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { email, password, age });
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }
}
