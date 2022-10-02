import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-box',
  templateUrl: './error-box.component.html',
  styleUrls: ['./error-box.component.scss']
})
export class ErrorBoxComponent implements OnInit {
  boxTitle: string;
  errorMessage: string;
  constructor(
    private dialogRef: MatDialogRef<ErrorBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.dialogRef.disableClose = true;
  }
  public closeDialog() {
    this.dialogRef.close();
  }
}
