import { inject, Injectable, signal } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import { tap } from 'rxjs'
import { environment } from '../../environments/environment'
import { User } from './user.model'

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient)
  private router = inject(Router)

  private baseUrl = environment.apiUrl + 'auth'

  currentUser = signal<User | null>(null)
  isLoggedIn = signal(false)
  isLoading = signal(false)

  register(username: string, password: string) {
    this.isLoading.set(true)
    return this.http.post<User>(`${this.baseUrl}/register`, { username, password }, { withCredentials: true }).pipe(
      tap({
        next: (user) => {
          this.currentUser.set(user)
          this.isLoggedIn.set(true)
          this.isLoading.set(false)
        },
        error: () => this.isLoading.set(false),
      })
    )
  }

  login(username: string, password: string) {
    this.isLoading.set(true)
    return this.http.post<User>(`${this.baseUrl}/login`, { username, password }, { withCredentials: true }).pipe(
      tap({
        next: (user) => {
          this.currentUser.set(user)
          this.isLoggedIn.set(true)
          this.isLoading.set(false)
        },
        error: () => this.isLoading.set(false),
      })
    )
  }

  logout() {
    return this.http.post(`${this.baseUrl}/logout`, {}, { withCredentials: true }).pipe(
      tap({
        next: () => {
          this.currentUser.set(null)
          this.isLoggedIn.set(false)
          this.router.navigate(['/'])
        },
      })
    )
  }

  fetchCurrentUser() {
    return this.http.get<User>(`${this.baseUrl}/me`, { withCredentials: true }).pipe(
      tap({
        next: (user) => {
          this.currentUser.set(user)
          this.isLoggedIn.set(true)
        },
        error: () => {
          this.currentUser.set(null)
          this.isLoggedIn.set(false)
        },
      })
    )
  }
}
