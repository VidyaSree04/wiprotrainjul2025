import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8081/user';

  constructor(private http: HttpClient) {}

  register(user: User): Observable<User> {
    user.userType = 1; // always normal user
    return this.http.post<User>(this.baseUrl, user);
  }

  login(userId: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/login`, null, { params: { userId, password } })
      .pipe(
        tap(user => localStorage.setItem('user', JSON.stringify(user)))
      );
  }

  logout() {
    localStorage.removeItem('user');
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.userType === 0;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }
}