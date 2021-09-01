import { Component, OnInit } from '@angular/core';
import { Agency } from '../../interfaces/agency.interface';
import { AgenciesService } from '../../services/agencies.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../components/confirm/confirm.component';

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
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.agency = this.getCleanAgency();
    if (this.router.url.includes('add')) {
      return;
    }
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.agenciesService.getById(id)))
      .subscribe((agency) => (this.agency = agency));
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
    if (this.agency.id) {
      this.agenciesService
        .update(this.agency)
        .subscribe(() => this.showSnackBar('Agencia Actualizada'));
    } else {
      this.agenciesService.create(this.agency).subscribe((agency) => {
        this.router.navigate(['/agencies', agency.id, 'edit']);
        this.showSnackBar('Agencia Creada');
      });
    }
  }

  delete(): void {
    const dialog = this.dialog.open(ConfirmComponent, {
      width: '250px',
      data: { ...this.agency },
    });

    dialog.afterClosed().subscribe((response) => {
      if (response) {
        if (this.agency.id) {
          this.agenciesService.delete(this.agency.id).subscribe(() => {
            this.router.navigate(['/agencies/list']);
          });
        }
      }
    });
  }
}
