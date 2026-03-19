import { Component } from '@angular/core'
import { Prompt } from '../prompt.models'
import { PromptCard } from "../prompt-card/prompt-card";

@Component({
  selector: 'app-prompt-list',
  imports: [PromptCard],
  templateUrl: './prompt-list.html',
  styleUrl: './prompt-list.scss',
})
export class PromptList {

prompts: Prompt[] = [
      {
    "id": 2,
    "title": "Post LinkedIn engageant",
    "content": "Écris un post LinkedIn court (150–200 mots) qui :\n\n- commence par une accroche question ou chiffre\n- partage une idée concrète ou une leçon apprise\n- se termine par un call-to-action (question ou invitation à commenter)\n\nTon professionnel mais humain.",
    "score": 1,
    "createdAt": "2025-01-20T14:30:00.000Z",
    "category": {
      "id": 2,
      "name": "Posts LinkedIn"
    },
    "author": {
      "id": 2,
      "username": "alice"
    },
    "userVote": null
  },
  {
    "id": 3,
    "title": "Article de blog SEO",
    "content": "Rédige une introduction d'article de blog (2–3 paragraphes) optimisée SEO :\n\n- inclure le mot-clé principal dans le premier paragraphe\n- poser le problème du lecteur\n- annoncer ce que l'article va apporter\n\nTon clair et direct.",
    "score": 0,
    "createdAt": "2025-01-25T09:15:00.000Z",
    "category": {
      "id": 3,
      "name": "Rédaction"
    },
    "author": {
      "id": 2,
      "username": "alice"
    },
    "userVote": null
  }

]

}
