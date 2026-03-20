import { Routes } from '@angular/router'
import { authGuard } from './auth/auth.guard'

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'prompts',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadComponent: () => import('./auth/auth-form/auth-form').then((m) => m.AuthForm),
  },
  {
    path: 'prompts',
    loadComponent: () =>
      import('./prompts/prompt-list/prompt-list').then((m) => m.PromptList),
  },
  {
    path: 'prompts/create',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./prompts/prompt-form/prompt-form').then((m) => m.PromptForm),
  },
  {
    path: '**',
    redirectTo: 'prompts',
  },
]
