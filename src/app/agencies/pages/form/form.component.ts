import { Component, OnInit } from '@angular/core';
import { Agency } from '../../interfaces/agency.interface';
import { AgenciesService } from '../../services/agencies.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add',
  templateUrl: './form.component.html',
  styles: [
    `
      img {
        width: 100%;
        border-radius: 10px;
      }
    `,
  ],
})
export class FormComponent implements OnInit {
  agency: Agency;

  constructor(
    private agenciesService: AgenciesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.agency = this.getCleanAgency();
    this.activatedRoute.params.subscribe(({ id }) => {
      const agency = this.agenciesService.getById(id);
      if (agency) {
        this.agency = agency;
      }
    });
  }

  ngOnInit(): void {}

  showSnackBar(message: string): void {
    this._snackBar.open(message, 'X', {
      duration: 5000,
    });
  }

  getCleanAgency(): Agency {
    return {
      agencia: '',
      distrito: '',
      provincia: '',
      departamento: '',
      direccion: '',
      lat: undefined,
      lon: undefined,
    };
  }

  save(): void {
    this.agenciesService.update(this.agency);
    this.showSnackBar('Agencia Actualizada');
  }
}
