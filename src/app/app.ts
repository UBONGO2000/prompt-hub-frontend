import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core'
import { Navbar } from './navbar/navbar'
import { Toast } from './shared/toast/toast'
import { RouterOutlet } from '@angular/router'
import { AuthService } from './auth/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [Navbar, Toast, RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit {
  private authService = inject(AuthService)

  ngOnInit() {
    this.authService.fetchCurrentUser().subscribe()
  }
}
