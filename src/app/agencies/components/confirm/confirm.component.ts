import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Agency } from '../../interfaces/agency.interface';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styles: [],
})
export class ConfirmComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Agency
  ) {}

  ngOnInit(): void {}

  delete(): void {
    this.dialogRef.close(true);
  }

  close(): void {
    this.dialogRef.close();
  }
}
