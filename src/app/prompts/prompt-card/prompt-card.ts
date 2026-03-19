import { Component, input, output, inject, signal } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Prompt } from '../prompt.models'
import { PromptService } from '../prompt-service'

@Component({
  selector: 'app-prompt-card',
  imports: [FormsModule],
  templateUrl: './prompt-card.html',
  styleUrl: './prompt-card.scss',
})
export class PromptCard {
  prompt = input.required<Prompt>()

  deleted = output<number>()
  updated = output<Prompt>()

  private promptService = inject(PromptService)

  isEditing = signal(false)
  editTitle = ''
  editContent = ''
  isLoading = signal(false)

  copyToClipboard() {
    void navigator.clipboard.writeText(this.prompt().content)
  }

  onDelete() {
    const id = this.prompt().id
    if (confirm('Êtes-vous sûr de vouloir supprimer ce prompt ?')) {
      this.isLoading.set(true)
      this.promptService.deletePrompt(id).subscribe({
        next: () => {
          this.deleted.emit(id)
          this.isLoading.set(false)
        },
        error: (err) => {
          console.error('Erreur lors de la suppression:', err)
          this.isLoading.set(false)
        },
      })
    }
  }

  startEdit() {
    const p = this.prompt()
    this.editTitle = p.title
    this.editContent = p.content
    this.isEditing.set(true)
  }

  cancelEdit() {
    this.isEditing.set(false)
    this.editTitle = ''
    this.editContent = ''
  }

  saveEdit() {
    const p = this.prompt()

    if (!this.editTitle.trim() || !this.editContent.trim()) {
      alert('Le titre et le contenu sont requis')
      return
    }

    this.isLoading.set(true)
    this.promptService
      .updatePrompt(p.id, {
        title: this.editTitle.trim(),
        content: this.editContent.trim(),
        categoryId: p.category.id,
      })
      .subscribe({
        next: (updated) => {
          this.updated.emit(updated)
          this.isEditing.set(false)
          this.isLoading.set(false)
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour:', err)
          this.isLoading.set(false)
        },
      })
  }
}
