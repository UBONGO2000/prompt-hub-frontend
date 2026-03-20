import { ChangeDetectionStrategy, Component, input, output, inject, signal, computed } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Prompt } from '../prompt.models'
import { PromptService } from '../prompt-service'
import { AuthService } from '../../auth/auth.service'
import { ToastService } from '../../shared/toast.service'

@Component({
  selector: 'app-prompt-card',
  imports: [FormsModule],
  templateUrl: './prompt-card.html',
  styleUrl: './prompt-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromptCard {
  prompt = input.required<Prompt>()

  deleted = output<number>()
  updated = output<Prompt>()

  private promptService = inject(PromptService)
  private authService = inject(AuthService)
  private toastService = inject(ToastService)

  isEditing = signal(false)
  editTitle = ''
  editContent = ''
  isLoading = signal(false)

  isOwner = computed(() => {
    const user = this.authService.currentUser()
    return user !== null && user.id === this.prompt().author.id
  })

  isLoggedIn = computed(() => this.authService.isLoggedIn())

  copyToClipboard() {
    void navigator.clipboard.writeText(this.prompt().content)
    this.toastService.success('Prompt copié dans le presse-papier')
  }

  onDelete() {
    const id = this.prompt().id
    if (confirm('Êtes-vous sûr de vouloir supprimer ce prompt ?')) {
      this.isLoading.set(true)
      this.promptService.deletePrompt(id).subscribe({
        next: () => {
          this.deleted.emit(id)
          this.toastService.success('Prompt supprimé avec succès')
          this.isLoading.set(false)
        },
        error: (err) => {
          const msg = err.status === 403 ? 'Vous ne pouvez pas supprimer ce prompt' : 'Erreur lors de la suppression'
          this.toastService.error(msg)
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
      this.toastService.error('Le titre et le contenu sont requis')
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
          this.toastService.success('Prompt mis à jour avec succès')
          this.isLoading.set(false)
        },
        error: (err) => {
          const msg = err.status === 403 ? 'Vous ne pouvez pas modifier ce prompt' : 'Erreur lors de la mise à jour'
          this.toastService.error(msg)
          this.isLoading.set(false)
        },
      })
  }

  onUpvote() {
    if (!this.isLoggedIn()) return
    this.promptService.upvote(this.prompt().id).subscribe({
      next: (updated) => this.updated.emit(updated),
      error: () => this.toastService.error('Erreur lors du vote'),
    })
  }

  onDownvote() {
    if (!this.isLoggedIn()) return
    this.promptService.downvote(this.prompt().id).subscribe({
      next: (updated) => this.updated.emit(updated),
      error: () => this.toastService.error('Erreur lors du vote'),
    })
  }
}
