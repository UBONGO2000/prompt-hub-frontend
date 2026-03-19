import { Injectable, signal, effect } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly STORAGE_KEY = 'theme'

  isDarkMode = signal(this.getInitialTheme())

  constructor() {
    effect(() => {
      const isDark = this.isDarkMode()
      document.body.classList.toggle('light-mode', !isDark)
      localStorage.setItem(this.STORAGE_KEY, isDark ? 'dark' : 'light')
    })
  }

  private getInitialTheme(): boolean {
    const stored = localStorage.getItem(this.STORAGE_KEY)
    if (stored) {
      return stored === 'dark'
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  toggle() {
    this.isDarkMode.update((v) => !v)
  }
}
