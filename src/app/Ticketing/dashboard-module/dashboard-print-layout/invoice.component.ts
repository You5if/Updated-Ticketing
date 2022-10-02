import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ChartType } from 'chart.js';
import { PrintService } from '../print.service';


@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class DashboardPrintlayoutComponent implements OnInit {

  barChart = {
    // data:{
    //   datasets: [
    //     {backgroundColor: ["red", "green", "blue"],}
    //   ]
    // },
    ChartOptions : {
      scaleShowVerticalLines: false,
      responsive: true,
      elements:{
        bar:{
          backgroundColor:["#55efc4", "#30336b", "#22a6b3"]
        }
      }
    },
     ChartLabels : []as any[],
     ChartType : 'bar' as ChartType,
     ChartLegend : true,
     ChartData : [
      {data: [2]as any[], label:'Opened', backgroundColor:"#55efc4", borderColor:"#55efc4", barHoverBackgroundColor:"#55efc4"},
      {data: [43]as any[], label:'Assigned', backgroundColor:"#30336b", borderColor:"#30336b", barHoverBackgroundColor:"#30336b"},
      {data: [55]as any[], label:'Closed', backgroundColor:"#22a6b3", borderColor:"#22a6b3", barHoverBackgroundColor:"#22a6b3"},
  
    ],
    ChartColors: [
      {backgroundColor: '#55efc4'},
      {backgroundColor: '#30336b'},
      {backgroundColor: '#22a6b3'}
    ]
  }
  
  deptResult:any[]= []
  @ViewChild('pdfTable') pdfTable: ElementRef;

  
  dataSource:any = new MatTableDataSource([]);

  deptList: any[] = []
  deptArray: any[]
  
 dashboardIds: any
 
  constructor(
   
    private route: ActivatedRoute,
    private printService: PrintService
  ) { 
    this.dashboardIds = JSON.parse(route.snapshot.params['dashboardIds'])
      console.log(this.dashboardIds);
  }

  ngOnInit(): void {
    
    this.dashboardIds
    .map(() => {
      this.deptResult = this.dashboardIds[0].table;
      // this.barChart.ChartLabels = this.dashboardIds[0].chartLabels;
      
    
    // this.dataSource =  new MatTableDataSource(this.ELEMENT_DATA);
    });
    for (let i = 0; i < this.deptResult.length; i++) {
      this.barChart.ChartData[0].data.push(this.deptResult[i].open)
      this.barChart.ChartData[1].data.push(this.deptResult[i].assign)
      this.barChart.ChartData[2].data.push(this.deptResult[i].closed)
    }
    console.log(this.barChart);
    
  Promise.all(this.dashboardIds)
    .then(() => this.printService.onDataReady());
  }

}
