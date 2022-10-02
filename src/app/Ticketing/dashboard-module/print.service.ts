import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PrintService {
  isPrinting = false;

  constructor(private router: Router) { }

  printDocument(documentName: string, tableData: any, listData: any) {
    var data:any[] = []
     data.push({
      table: tableData,
      chartLabels: listData,

    })
    var tData = JSON.stringify(data)
    
    this.isPrinting = true;
    this.router.navigate(['/',
      { outlets: {
        'print': ['print', documentName, tData]
      }}]);
  }

  onDataReady() {
    setTimeout(() => {
      window.print()
      this.isPrinting = false;
      this.router.navigate([{ outlets: { print: null }}]);
      this.router.navigateByUrl('/System/Dashboard')
    });
  }
}