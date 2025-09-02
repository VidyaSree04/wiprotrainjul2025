import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8082/user'; // your user-service URL

  constructor(private http: HttpClient) { }

  login(userId: string, password: string): Observable<string> {
    const params = new HttpParams()
      .set('userId', userId)
      .set('password', password);
    return this.http.post(`${this.baseUrl}/login`, null, { params, responseType: 'text' });
  }

  logout(id: number): Observable<string> {
    return this.http.post(`${this.baseUrl}/logout/${id}`, null, { responseType: 'text' });
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}`, user);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }
}