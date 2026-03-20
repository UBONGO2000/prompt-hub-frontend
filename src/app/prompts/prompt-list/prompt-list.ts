import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core'
import { PromptCard } from '../prompt-card/prompt-card'
import { PromptService } from '../prompt-service'
import { Prompt } from '../prompt.models'
import { ToastService } from '../../shared/toast.service'

@Component({
  selector: 'app-prompt-list',
  imports: [PromptCard],
  templateUrl: './prompt-list.html',
  styleUrl: './prompt-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromptList {
  private promptService = inject(PromptService)
  private toastService = inject(ToastService)

  prompts = signal<Prompt[]>([])
  isLoading = signal(true)

  constructor() {
    this.loadPrompts()
  }

  loadPrompts() {
    this.isLoading.set(true)
    this.promptService.getPrompts().subscribe({
      next: (data) => {
        this.prompts.set(data)
        this.isLoading.set(false)
      },
      error: () => {
        this.toastService.error('Erreur lors du chargement des prompts')
        this.isLoading.set(false)
      },
    })
  }

  onDeletePrompt(id: number) {
    this.prompts.update((prompts) => prompts.filter((p) => p.id !== id))
  }

  onUpdatePrompt(updatedPrompt: Prompt) {
    this.prompts.update((prompts) =>
      prompts.map((p) => (p.id === updatedPrompt.id ? updatedPrompt : p)),
    )
  }
}
