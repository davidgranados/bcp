import { Component, Input } from '@angular/core';
import { Agency } from '../../interfaces/agency.interface';

@Component({
  selector: 'app-agency-card',
  templateUrl: './agency-card.component.html',
  styles: [
    `
      mat-card {
        margin-top: 20px;
      }
    `,
  ],
})
export class AgencyCardComponent {
  @Input()
  agency: Agency | undefined;
}
