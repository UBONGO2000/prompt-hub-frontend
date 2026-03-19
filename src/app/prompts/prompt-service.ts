import { inject, Injectable } from '@angular/core'
import { Prompt } from './prompt.models'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class PromptService {
  httpClient = inject(HttpClient)

  baseUrl = environment.apiUrl + 'prompts'

  getPrompts() {
    return this.httpClient.get<Prompt[]>(this.baseUrl)
  }

  createPrompt(prompt: { title: string; content: string; categoryId: number }) {
    return this.httpClient.post<Prompt>(this.baseUrl, prompt)
  }

  updatePrompt(
    id: number,
    prompt: {
      title?: string
      content?: string
      categoryId?: number
    },
  ) {
    return this.httpClient.put<Prompt>(`${this.baseUrl}/${id}`, prompt)
  }

  deletePrompt(id: number) {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`)
  }
}
