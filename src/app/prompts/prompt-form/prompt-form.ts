import { Component, inject } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { CategoryService } from '../category-service'
import { PromptService } from '../prompt-service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-prompt-form',
  imports: [ReactiveFormsModule],
  templateUrl: './prompt-form.html',
  styleUrl: './prompt-form.scss',
})
export class PromptForm {
  private router = inject(Router)
  private promptService = inject(PromptService)
  private categoryService = inject(CategoryService)
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
      console.error('Formulaire invalide')
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
        this.router.navigate(['/'])
      },
      error: (error) => {
        console.error('Erreur lors de la création:', error)
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
