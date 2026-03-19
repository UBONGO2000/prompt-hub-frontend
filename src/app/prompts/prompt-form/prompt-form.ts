import { Component, inject } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
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
    title: new FormControl('', { nonNullable: true }),
    content: new FormControl('', { nonNullable: true }),
    categoryId: new FormControl<number>(0, { nonNullable: true }),
  })

  submit() {
    const formValue = this.form.getRawValue()

    if (!formValue.title || !formValue.content || !formValue.categoryId) {
      console.error('Formulaire incomplet')
      return
    }

    const prompt = {
      title: formValue.title,
      content: formValue.content,
      categoryId: Number(formValue.categoryId),
    }

    console.log('Envoi du prompt:', prompt)

    this.promptService.createPrompt(prompt).subscribe({
      next: (response) => {
        console.log('Prompt créé:', response)
        this.router.navigate(['/'])
      },
      error: (error) => {
        console.error('Erreur lors de la création:', error)
      },
    })
  }
}
