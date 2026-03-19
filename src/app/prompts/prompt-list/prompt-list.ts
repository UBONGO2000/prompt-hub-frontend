import { Component, inject, signal } from '@angular/core'
import { PromptCard } from '../prompt-card/prompt-card'
import { PromptService } from '../prompt-service'
import { Prompt } from '../prompt.models'

@Component({
  selector: 'app-prompt-list',
  imports: [PromptCard],
  templateUrl: './prompt-list.html',
  styleUrl: './prompt-list.scss',
})
export class PromptList {
  private promptService = inject(PromptService)

  prompts = signal<Prompt[]>([])

  constructor() {
    this.loadPrompts()
  }

  loadPrompts() {
    this.promptService.getPrompts().subscribe({
      next: (data) => this.prompts.set(data),
      error: (err) => console.error('Erreur chargement prompts:', err),
    })
  }

  onDeletePrompt(id: number) {
    this.prompts.update((prompts: Prompt[]) => prompts.filter((p: Prompt) => p.id !== id))
  }

  onUpdatePrompt(updatedPrompt: Prompt) {
    this.prompts.update((prompts: Prompt[]) =>
      prompts.map((p: Prompt) => (p.id === updatedPrompt.id ? updatedPrompt : p)),
    )
  }
}
