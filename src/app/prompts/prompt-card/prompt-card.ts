import { Component, input } from '@angular/core'
import { Prompt } from '../prompt.models'

@Component({
  selector: 'app-prompt-card',
  imports: [],
  templateUrl: './prompt-card.html',
  styleUrl: './prompt-card.scss',
})
export class PromptCard {
  prompt = input.required<Prompt>()

  copyToClipboard(){
    void navigator.clipboard.writeText(this.prompt().content)
  }

  
}
