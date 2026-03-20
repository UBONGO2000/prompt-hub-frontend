import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from '../auth.service'
import { ToastService } from '../../shared/toast.service'

@Component({
  selector: 'app-auth-form',
  imports: [ReactiveFormsModule],
  templateUrl: './auth-form.html',
  styleUrl: './auth-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthForm {
  private authService = inject(AuthService)
  private router = inject(Router)
  private toastService = inject(ToastService)

  isLoginMode = signal(true)
  isLoading = signal(false)
  errorMessage = signal('')

  form = new FormGroup({
    username: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(4)] }),
  })

  toggleMode() {
    this.isLoginMode.update((v) => !v)
    this.errorMessage.set('')
    this.form.reset()
  }

  submit() {
    this.form.markAllAsTouched()
    this.errorMessage.set('')

    if (this.form.invalid) return

    const { username, password } = this.form.getRawValue()
    this.isLoading.set(true)

    const request$ = this.isLoginMode()
      ? this.authService.login(username, password)
      : this.authService.register(username, password)

    request$.subscribe({
      next: () => {
        this.isLoading.set(false)
        this.toastService.success(
          this.isLoginMode() ? 'Connexion réussie !' : 'Compte créé avec succès !'
        )
        this.router.navigate(['/'])
      },
      error: (err) => {
        this.isLoading.set(false)
        const msg =
          err.status === 409
            ? "Ce nom d'utilisateur est déjà pris"
            : err.status === 401
              ? 'Identifiants incorrects'
              : 'Une erreur est survenue'
        this.errorMessage.set(msg)
        this.toastService.error(msg)
      },
    })
  }

  get username() {
    return this.form.get('username')
  }

  get password() {
    return this.form.get('password')
  }
}
