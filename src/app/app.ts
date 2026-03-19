import { Component } from '@angular/core'
import { Navbar } from './navbar/navbar'
import { PromptList } from './prompts/prompt-list/prompt-list'

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [Navbar, PromptList],
})
export class App {}
