import { Component, inject } from '@angular/core'
import { ThemeService } from '../theme.service'
import { AuthService } from '../auth/auth.service'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  private themeService = inject(ThemeService)
  private authService = inject(AuthService)

  isDarkMode = this.themeService.isDarkMode
  isLoggedIn = this.authService.isLoggedIn
  currentUser = this.authService.currentUser

  toggleTheme() {
    this.themeService.toggle()
  }

  logout() {
    this.authService.logout().subscribe()
  }
}
