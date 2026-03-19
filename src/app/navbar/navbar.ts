import { Component, inject } from '@angular/core'
import { ThemeService } from '../theme.service'
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
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
