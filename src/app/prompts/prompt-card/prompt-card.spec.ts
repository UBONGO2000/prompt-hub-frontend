import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideHttpClient } from '@angular/common/http'
import { PromptCard } from './prompt-card'

describe('PromptCard', () => {
  let component: PromptCard
  let fixture: ComponentFixture<PromptCard>

  beforeEach(async () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      }),
    })

    await TestBed.configureTestingModule({
      imports: [PromptCard],
      providers: [provideHttpClient()],
    }).compileComponents()

    fixture = TestBed.createComponent(PromptCard)
    component = fixture.componentInstance
    fixture.componentRef.setInput('prompt', {
      id: 1,
      title: 'Test Prompt',
      content: 'Test content',
      score: 0,
      createdAt: new Date().toISOString(),
      category: { id: 1, name: 'Test' },
      author: { id: 1, username: 'testuser' },
      userVote: null,
    })
    await fixture.whenStable()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
