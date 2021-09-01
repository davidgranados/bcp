import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Agency } from '../../interfaces/agency.interface';
import { AgenciesService } from '../../services/agencies.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styles: [
    `
      img {
        width: 100%;
        border-radius: 5px;
      }
    `,
  ],
})
export class AgencyComponent implements OnInit {
  agency: Agency | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private agenciesService: AgenciesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.agenciesService.getById(id)))
      .subscribe((agency) => (this.agency = agency));
  }

  goBack(): void {
    this.router.navigate(['/agencies/list']);
  }
}
