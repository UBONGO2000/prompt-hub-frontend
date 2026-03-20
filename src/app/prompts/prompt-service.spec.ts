import { TestBed } from '@angular/core/testing'
import { provideHttpClient } from '@angular/common/http'

import { PromptService } from './prompt-service'

describe('PromptService', () => {
  let service: PromptService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    })
    service = TestBed.inject(PromptService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
