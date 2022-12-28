import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ChartDataset, ChartData, ChartType } from 'chart.js';

// import pdfMake from 'pdfmake/build/pdfmake';
// import pdfFonts from 'pdfmake/build/vfs_fonts';
// pdfMake.vfs = pdfFonts.pdfMake.vfs;
// import htmlToPdfmake from 'html-to-pdfmake';
import jsPDF from 'jspdf';
import { DashboardService } from './dashboard.service';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { PrintService } from './print.service';

@Component({
  selector: 'app-dashboard-module',
  templateUrl: './dashboard-module.component.html',
  styleUrls: ['./dashboard-module.component.scss']
})
export class DashboardModuleComponent implements OnInit {

  lineChart = {
    ChartOptions : {
      scaleShowVerticalLines: false,
      responsive: true
    },
     ChartLabels : ['1', '2', '3', '4', '5', '6'],
     ChartType : 'line',
     ChartLegend : true,
     ChartData : [
      { data: [85, 80, 78, 75, 77, 75], label: 'Crude oil prices' , fill: false}
    ],
    ChartColors: [
    ]
  }

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
      {data: []as any[], label:'Opened', backgroundColor:"#55efc4", borderColor:"#55efc4", barHoverBackgroundColor:"#55efc4"},
      {data: []as any[], label:'Assigned', backgroundColor:"#30336b", borderColor:"#30336b", barHoverBackgroundColor:"#30336b"},
      {data: []as any[], label:'Closed', backgroundColor:"#22a6b3", borderColor:"#22a6b3", barHoverBackgroundColor:"#22a6b3"},
  
    ],
    ChartColors: [
      {backgroundColor: '#55efc4'},
      {backgroundColor: '#30336b'},
      {backgroundColor: '#22a6b3'}
    ]
  }
  
   horizantalBarChart = {
    ChartOptions : {
      scaleShowVerticalLines: false,
      responsive: true
    },
     ChartLabels : ['1', '2', '3', '4', '5', '6', '7'],
     ChartType : 'horizontalBar',
     ChartLegend : true,
     ChartData : [
      {data: [22, 34, 67, 24, 88, 63, 96], label:'Expense'},
      {data: [45, 87, 34, 65, 44, 86, 55], label:'Revenue'}
  
    ],
    ChartColors: [
      {backgroundColor: '#30336b'},
      {backgroundColor: '#6ab04c'},
    ]
  }

  radarChart = {
    ChartOptions : null,
     ChartLabels : ['1', '2', '3', '4'],
     ChartType : 'radar',
     ChartLegend : null,
     ChartData : [
      {data: [22, 34, 67, 24], label:'Series A'},
      {data: [45, 87, 34, 65], label:'Series B'}
  
    ],
    ChartColors: null
  }

  pieChart= {
    ChartOptions : null,
     ChartLabels : [' sales 1', 'sales 2', ' sales 3', 'sales 4'],
     ChartType : 'pie',
     ChartLegend : null,
     ChartData : [120, 150, 90, 180],
     ChartColors: [
      {backgroundColor: ['#22a6b3',
      '#4834d4',
      '#f0932b',
      '#95afc0',]}
    ]
  }
  polarChart = {
    ChartOptions : null,
     ChartLabels : [' sales 1', 'sales 2', ' sales 3', 'sales 4'],
     ChartType : 'polarArea',
     ChartLegend : null,
     ChartData : [120, 150, 90, 180],
     ChartColors: [
      {backgroundColor: ['#55efc4',
      '#fab1a0',
      '#0984e3',
      '#d63031',]}
    ]
  }

  DoughnutChart = {
    ChartOptions : null,
     ChartLabels : [' sales 1', 'sales 2', ' sales 3', 'sales 4'],
     ChartType : 'doughnut',
     ChartLegend : null,
     ChartData : [120, 150, 90, 180],
     ChartColors: null
  }
  

  foods: Food[] = [
    {value: '1', viewValue: 'Feb 2021'},
    {value: '2', viewValue: 'Oct 2021'},
    {value: '3', viewValue: 'Dec 2021'}
  ];
  Days: Food[] = [
    {value: 'D', viewValue: 'Days'},
    {value: 'M', viewValue: 'Months'},
    
  ];
  testArray: any[] = [1,2,2,3,4]
   @ViewChild('pdfTable') pdfTable: ElementRef;

   deptList: any[] = []
   deptArray: any[]
   deptResult: any[] = [];

   showNoAccessMessage: boolean = false
   showDashboard: boolean = false

   admin: string

  
  constructor(
    private router: Router,
    private service: DashboardService,
    private _ui: UIService,
    private _auth: AuthService,
    public printService: PrintService,
  ) { }

  ngOnInit() {
    this.admin = this._auth.getUserId()
 
    console.log("testArray", this.testArray);
    this.testArray.splice(2, 1)
    console.log("testArray", this.testArray);
    
    if (this.admin === '147') {
      this._ui.loadingStateChanged.next(true);
    this.service.getDepartmentsDashboard("GetTicketDshByDepartment").subscribe((result) => {
      this._ui.loadingStateChanged.next(false);
      this.deptArray = result
      this.showDashboard = true
      this.deptArray.map((item)=>{
        if(this.deptList.includes(item.deptName)){
          let replaced =this.deptResult.filter((element)=>{
            if(element.deptName===item.deptName){return element}
          })
          console.log('this.result3', JSON.stringify(this.deptResult));
          this.deptResult[this.deptResult.indexOf(replaced[0])].open += item.open
          this.deptResult[this.deptResult.indexOf(replaced[0])].assign += item.assign
          this.deptResult[this.deptResult.indexOf(replaced[0])].closed += item.closed
          console.log('this.result4', this.deptResult);
        }else{
          this.deptResult.push(item)
          this.deptList.push(item.deptName)
        }
      })
      console.log('this.result2', this.deptResult);

      this.barChart.ChartLabels = this.deptList
      for (let i = 0; i < this.deptResult.length; i++) {
        this.barChart.ChartData[0].data.push(this.deptResult[i].open)
        this.barChart.ChartData[1].data.push(this.deptResult[i].assign)
        this.barChart.ChartData[2].data.push(this.deptResult[i].closed)
      }

    })
    }else if (this.admin === '148') {
      this._ui.loadingStateChanged.next(true);
    this.service.getDepartmentsDashboard("GetTicketDshByDepartment").subscribe((result) => {
      this._ui.loadingStateChanged.next(false);
      this.deptArray = result
      this.showDashboard = true
      this.deptArray.map((item)=>{
        if(this.deptList.includes(item.deptName)){
          let replaced =this.deptResult.filter((element)=>{
            if(element.deptName===item.deptName){return element}
          })
          console.log('this.result3', JSON.stringify(this.deptResult));
          this.deptResult[this.deptResult.indexOf(replaced[0])].open += item.open
          this.deptResult[this.deptResult.indexOf(replaced[0])].assign += item.assign
          this.deptResult[this.deptResult.indexOf(replaced[0])].closed += item.closed
          console.log('this.result4', this.deptResult);
        }else{
          this.deptResult.push(item)
          this.deptList.push(item.deptName)
        }
      })
      console.log('this.result2', this.deptResult);

      this.barChart.ChartLabels = this.deptList
      for (let i = 0; i < this.deptResult.length; i++) {
        this.barChart.ChartData[0].data.push(this.deptResult[i].open)
        this.barChart.ChartData[1].data.push(this.deptResult[i].assign)
        this.barChart.ChartData[2].data.push(this.deptResult[i].closed)
      }

    })
    }else if (this.admin === '203') {
      this._ui.loadingStateChanged.next(true);
    this.service.getDepartmentsDashboard("GetTicketDshByDepartment").subscribe((result) => {
      this._ui.loadingStateChanged.next(false);
      this.deptArray = result
      this.showDashboard = true
      this.deptArray.map((item)=>{
        if(this.deptList.includes(item.deptName)){
          let replaced =this.deptResult.filter((element)=>{
            if(element.deptName===item.deptName){return element}
          })
          console.log('this.result3', JSON.stringify(this.deptResult));
          this.deptResult[this.deptResult.indexOf(replaced[0])].open += item.open
          this.deptResult[this.deptResult.indexOf(replaced[0])].assign += item.assign
          this.deptResult[this.deptResult.indexOf(replaced[0])].closed += item.closed
          console.log('this.result4', this.deptResult);
        }else{
          this.deptResult.push(item)
          this.deptList.push(item.deptName)
        }
      })
      console.log('this.result2', this.deptResult);

      this.barChart.ChartLabels = this.deptList
      for (let i = 0; i < this.deptResult.length; i++) {
        this.barChart.ChartData[0].data.push(this.deptResult[i].open)
        this.barChart.ChartData[1].data.push(this.deptResult[i].assign)
        this.barChart.ChartData[2].data.push(this.deptResult[i].closed)
      }

    })
    }else if (this.admin === '206') {
      this._ui.loadingStateChanged.next(true);
    this.service.getDepartmentsDashboard("GetTicketDshByDepartment").subscribe((result) => {
      this._ui.loadingStateChanged.next(false);
      this.deptArray = result
      this.showDashboard = true
      this.deptArray.map((item)=>{
        if(this.deptList.includes(item.deptName)){
          let replaced =this.deptResult.filter((element)=>{
            if(element.deptName===item.deptName){return element}
          })
          console.log('this.result3', JSON.stringify(this.deptResult));
          this.deptResult[this.deptResult.indexOf(replaced[0])].open += item.open
          this.deptResult[this.deptResult.indexOf(replaced[0])].assign += item.assign
          this.deptResult[this.deptResult.indexOf(replaced[0])].closed += item.closed
          console.log('this.result4', this.deptResult);
        }else{
          this.deptResult.push(item)
          this.deptList.push(item.deptName)
        }
      })
      console.log('this.result2', this.deptResult);

      this.barChart.ChartLabels = this.deptList
      for (let i = 0; i < this.deptResult.length; i++) {
        this.barChart.ChartData[0].data.push(this.deptResult[i].open)
        this.barChart.ChartData[1].data.push(this.deptResult[i].assign)
        this.barChart.ChartData[2].data.push(this.deptResult[i].closed)
      }

    })
    }else if (this.admin === '209') {
      this._ui.loadingStateChanged.next(true);
    this.service.getDepartmentsDashboard("GetTicketDshByDepartment").subscribe((result) => {
      this._ui.loadingStateChanged.next(false);
      this.deptArray = result
      this.showDashboard = true
      this.deptArray.map((item)=>{
        if(this.deptList.includes(item.deptName)){
          let replaced =this.deptResult.filter((element)=>{
            if(element.deptName===item.deptName){return element}
          })
          console.log('this.result3', JSON.stringify(this.deptResult));
          this.deptResult[this.deptResult.indexOf(replaced[0])].open += item.open
          this.deptResult[this.deptResult.indexOf(replaced[0])].assign += item.assign
          this.deptResult[this.deptResult.indexOf(replaced[0])].closed += item.closed
          console.log('this.result4', this.deptResult);
        }else{
          this.deptResult.push(item)
          this.deptList.push(item.deptName)
        }
      })
      console.log('this.result2', this.deptResult);

      this.barChart.ChartLabels = this.deptList
      for (let i = 0; i < this.deptResult.length; i++) {
        this.barChart.ChartData[0].data.push(this.deptResult[i].open)
        this.barChart.ChartData[1].data.push(this.deptResult[i].assign)
        this.barChart.ChartData[2].data.push(this.deptResult[i].closed)
      }

    })
    }else  {
      this._ui.loadingStateChanged.next(true);
      this.service.getDepartmentsDashboard2(Number(this._auth.getUserId())).subscribe((result) => {
        this._ui.loadingStateChanged.next(false);
        this.deptArray = result
        if (result === []) {
          this.showNoAccessMessage = true
          this.showDashboard = false
        }else {
          this.showNoAccessMessage = false
          this.showDashboard = true
        }
        this.deptArray.map((item)=>{
          if(this.deptList.includes(item.deptName)){
            let replaced =this.deptResult.filter((element)=>{
              if(element.deptName===item.deptName){return element}
            })
            console.log('this.result3', JSON.stringify(this.deptResult));
            this.deptResult[this.deptResult.indexOf(replaced[0])].open += item.open
            this.deptResult[this.deptResult.indexOf(replaced[0])].assign += item.assign
            this.deptResult[this.deptResult.indexOf(replaced[0])].closed += item.closed
            console.log('this.result4', this.deptResult);
          }else{
            this.deptResult.push(item)
            this.deptList.push(item.deptName)
          }
        })
        console.log('this.result2', this.deptResult);
  
        this.barChart.ChartLabels = this.deptList
        for (let i = 0; i < this.deptResult.length; i++) {
          this.barChart.ChartData[0].data.push(this.deptResult[i].open)
          this.barChart.ChartData[1].data.push(this.deptResult[i].assign)
          this.barChart.ChartData[2].data.push(this.deptResult[i].closed)
        }
  
      })
    }

    var num = 6
    setInterval(() => {
      var count = Math.floor(Math.random() * 100).toString()
       num ++
      this.lineChart.ChartData[0].data.push(Number(count))
      this.lineChart.ChartLabels.push(num.toString())
      }, 500);

    
    
  }

 getUnique(result:any) {
  var unique = result
       
    for (let i = 0; i < result.length; i++) {
      if (result[i].deptName === result[i+1].deptName) {
        if (result[i].open === result[i+1].open) {
          if (result[i].assign === result[i+1].assign) {
            if (result[i].closed === result[i+1].closed) {   
          unique.splice(i,2)
            }
          }
        }
      }
    }
    
  }
 
  
  public downloadAsPDF() {  
    // let pdf = new jsPDF('p', 'pt', 'a4');
    // pdf.html(this.pdfTable.nativeElement, {
    //   callback: (pdf) => {
    //     pdf.save("demo.pdf")
    //   }
    // })

    let content=this.pdfTable.nativeElement;  
    let doc = new jsPDF();  
    let _elementHandlers =  
    {  
      '#editor':function(element:any,renderer:any){  
        return true;  
      }  
    };  
    // solve this
    // doc.fromHTML(content.innerHTML,15,15,{  
  
    //   'width':190,  
    //   'elementHandlers':_elementHandlers  
    // });  
  
    doc.save('test.pdf');  
  }  

  onDateChange(event: string) {
    if (event == '1') {
      this.horizantalBarChart = {
        ChartOptions : {
          scaleShowVerticalLines: false,
          responsive: true
        },
         ChartLabels : ['1', '2', '3', '4', '5', '6', '7'],
         ChartType : 'horizontalBar',
         ChartLegend : true,
         ChartData : [
          {data: [22, 34, 67, 24, 88, 63, 96], label:'Expense'},
          {data: [45, 87, 34, 65, 44, 86, 55], label:'Revenue'}
      
        ],
        ChartColors: [
          {backgroundColor: '#30336b'},
          {backgroundColor: '#6ab04c'},
        ]
      }
      
    }else if (event == '2') {
      this.horizantalBarChart = {
        ChartOptions : {
          scaleShowVerticalLines: false,
          responsive: true
        },
         ChartLabels : ['1', '2', '3', '4', '5', '6', '7'],
         ChartType : 'horizontalBar',
         ChartLegend : true,
         ChartData : [
          {data: [45, 87, 34, 65, 44, 86, 55], label:'Expense'},
          {data: [77, 34, 22, 68, 87, 23, 88], label:'Revenue'}
      
        ],
        ChartColors: [
          {backgroundColor: '#30336b'},
          {backgroundColor: '#6ab04c'},
        ]
      }
    } else if (event == '3') {
      this.horizantalBarChart = {
        ChartOptions : {
          scaleShowVerticalLines: false,
          responsive: true
        },
         ChartLabels : ['1', '2', '3', '4', '5', '6', '7'],
         ChartType : 'horizontalBar',
         ChartLegend : true,
         ChartData : [
          {data: [22, 25, 77, 99, 14, 24, 47], label:'Expense'},
          {data: [44, 88, 25, 85, 36, 47, 25], label:'Revenue'}
      
        ],
        ChartColors: [
          {backgroundColor: '#30336b'},
          {backgroundColor: '#6ab04c'},
        ]
      }
    }
  }

  onChangeDays(event: string) {
    if (event == 'M') {
      this.barChart = {
        ChartOptions : {
          scaleShowVerticalLines: false,
          responsive: true,
          elements:{
            bar:{
              backgroundColor:["#55efc4", "#30336b", "#22a6b3"]
            }
          }
        },
         ChartLabels : ['Jan', 'Feb', 'Mar'],
         ChartType : 'bar',
         ChartLegend : true,
         ChartData : [
          {data: [22, 34, 67], label:'Months', backgroundColor: '#55efc4', borderColor:"#55efc4", barHoverBackgroundColor:"#55efc4"},
          
      
        ],
        ChartColors: [
          {backgroundColor: '#55efc4'},
        ]
      }
    }else {
      this.barChart = {
        ChartOptions : {
          scaleShowVerticalLines: false,
          responsive: true,
          elements:{
            bar:{
              backgroundColor:["#55efc4", "#30336b", "#22a6b3"]
            }
          }
        },
         ChartLabels : [],
         ChartType : 'bar',
         ChartLegend : true,
         ChartData : [
          {data: [22, 34, 67, 24, 88, 63, 96, 88, 80, 20, 22, 34, 67, 24, 88, 63, 96, 88, 50, 20, 22, 34, 67, 24, 88, 63, 96, 88, 10, 20], label:'Days', backgroundColor: '#55efc4', borderColor:"#55efc4", barHoverBackgroundColor:"#55efc4"},
          
      
        ],
        ChartColors: [
          {backgroundColor: '#55efc4'},
        ]
      }
    }
    
  }

  openDetails(data: any) {
    this.service.departmentId = data.deptId
    this.service.Department = data.deptName
    this.service.openedTickets = data.open
    this.service.assignedTickets = data.assign
    this.service.closedTickets = data.close
    this.router.navigate(['System/Details']);
  }


  onPrint() {
    this.printService.printDocument("Dashboards",this.deptResult, this.deptList)
  }
  


}

interface Food {
  value: string;
  viewValue: string;
}

