import { Component, OnInit } from '@angular/core';

import { AgenciesService } from '../../services/agencies.service';
import { Agency } from '../../interfaces/agency.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [],
})
export class ListComponent implements OnInit {
  agencies: Agency[] = [];

  constructor(private agenciesService: AgenciesService) {}

  ngOnInit(): void {
    this.sleep(2000).then(() => {
      this.agencies = this.agenciesService.getAgencies();
    });
  }

  sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
