import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideHttpClient } from '@angular/common/http'
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing'
import { PromptForm } from './prompt-form'

describe('PromptForm', () => {
  let component: PromptForm
  let fixture: ComponentFixture<PromptForm>
  let httpMock: HttpTestingController

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
      imports: [PromptForm],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents()

    httpMock = TestBed.inject(HttpTestingController)
    fixture = TestBed.createComponent(PromptForm)
    component = fixture.componentInstance

    const req = httpMock.expectOne('http://localhost:3000/categories')
    req.flush([{ id: 1, name: 'Test' }])

    await fixture.whenStable()
  })

  afterEach(() => {
    httpMock.verify()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
