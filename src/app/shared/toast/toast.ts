import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { ToastService } from '../toast.service'

@Component({
  selector: 'app-toast',
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Toast {
  toastService = inject(ToastService)
}
