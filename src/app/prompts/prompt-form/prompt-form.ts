import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { CategoryService } from '../category-service'
import { PromptService } from '../prompt-service'
import { Router } from '@angular/router'
import { ToastService } from '../../shared/toast.service'

@Component({
  selector: 'app-prompt-form',
  imports: [ReactiveFormsModule],
  templateUrl: './prompt-form.html',
  styleUrl: './prompt-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromptForm {
  private router = inject(Router)
  private promptService = inject(PromptService)
  private categoryService = inject(CategoryService)
  private toastService = inject(ToastService)

  categories = toSignal(this.categoryService.getCategories())

  form = new FormGroup({
    title: new FormControl('', {
      validators: [Validators.required, Validators.maxLength(50)],
      nonNullable: true,
    }),
    content: new FormControl('', {
      validators: [Validators.required, Validators.minLength(10), Validators.maxLength(5000)],
      nonNullable: true,
    }),
    categoryId: new FormControl(0, {
      validators: [Validators.required, Validators.min(1)],
      nonNullable: true,
    }),
  })

  submit() {
    this.form.markAllAsTouched()

    if (this.form.invalid) {
      this.toastService.error('Veuillez corriger les erreurs du formulaire')
      return
    }

    const formValue = this.form.getRawValue()

    const prompt = {
      title: formValue.title,
      content: formValue.content,
      categoryId: Number(formValue.categoryId),
    }

    this.promptService.createPrompt(prompt).subscribe({
      next: () => {
        this.toastService.success('Prompt créé avec succès !')
        this.router.navigate(['/'])
      },
      error: (error) => {
        const msg = error.status === 403 ? 'Vous devez être connecté pour créer un prompt' : 'Erreur lors de la création'
        this.toastService.error(msg)
      },
    })
  }

  get title() {
    return this.form.get('title')
  }

  get content() {
    return this.form.get('content')
  }

  get categoryId() {
    return this.form.get('categoryId')
  }
}
