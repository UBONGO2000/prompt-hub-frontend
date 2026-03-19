import { Component, inject } from '@angular/core'
import { ThemeService } from '../theme.service'

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  private themeService = inject(ThemeService)
  isDarkMode = this.themeService.isDarkMode

  toggleTheme() {
    this.themeService.toggle()
  }
}
