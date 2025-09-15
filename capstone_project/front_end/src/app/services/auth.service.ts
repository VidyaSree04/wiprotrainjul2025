import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { API_BASE } from '../app.config';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


interface Decoded { sub?: string; roles?: string[]; userId?: number; exp?: number; }
@Injectable({
  providedIn: 'root'
})
export class AuthService {

   private base = API_BASE + '/userservice';

  constructor(private http: HttpClient, private router: Router) {}

  login(data: {username:string, password:string}) {
    return this.http.post<any>(`${this.base}/user/login`, data);
  }

  

  register(data: {username:string, email?:string, password:string}) {
    return this.http.post(`${this.base}/user/register`, data);
  }

  setToken(token:string){ localStorage.setItem('token', token); }
  getToken(){ return localStorage.getItem('token'); }
  clearToken(){ localStorage.removeItem('token'); }
  logout(){ this.clearToken(); this.router.navigate(['/login']); }

  isLoggedIn(): boolean {
    const t = this.getToken(); if(!t) return false;
    try { const d = jwtDecode<Decoded>(t); return !d.exp || d.exp*1000 > Date.now(); } catch { return false; }
  }

  getUsername(): string | null {
    const t = this.getToken(); if(!t) return null;
    try { return jwtDecode<Decoded>(t).sub || null; } catch { return null; }
  }

  getUserId(): number | null {
    const t = this.getToken(); if(!t) return null;
    try {
      const d = jwtDecode<Decoded>(t);
      return d.userId ? Number(d.userId) : null;
    } catch { return null; }
  }

  hasRole(role: string): boolean {
    const t = this.getToken();
    if(!t) return false;
    try { const d = jwtDecode<Decoded>(t); return (d.roles || []).includes(role); } catch { return false; }
  }
}
