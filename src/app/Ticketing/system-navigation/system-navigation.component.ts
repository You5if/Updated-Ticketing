import { Direction } from '@angular/cdk/bidi';
import { Component, OnInit } from '@angular/core';
import { StyleDirective } from '@angular/flex-layout';
import { MatDialog } from '@angular/material/dialog';
import { matDrawerAnimations } from '@angular/material/sidenav';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ResizeEvent } from 'angular-resizable-element';
// import { TouchSequence } from 'selenium-webdriver';
import { AppGlobals } from 'src/app/app.global';
import { CommonService } from 'src/app/components/common/common.service';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { LoginModule } from 'src/app/components/security/auth/login/login.model';
import { Send } from 'src/app/send.model';
import { AppNotificationEntryService } from '../appnotification/appnotification-entry/appnotification-entry.service';
import { ChangePasswordNewComponent } from '../change-password/change-password.component';

@Component({
  selector: 'app-system-navigation',
  templateUrl: './system-navigation.component.html',
  styleUrls: ['./system-navigation.component.scss']
})
export class SystemNavigationComponent implements OnInit {

  showFiller = false;
  showButton: boolean = false;
  key!: number;
  lang: string = "Arabic";
  direction: Direction = "ltr";
  lang_LS: string = "16001";
  break: boolean = true;
  title = 'SystemHR1';
  home!: string;
  shipping!: string
  businessP!: string;
  profile!:string;
  journal!: string;
  expense!: string;
  purchase!: string;
  company!: string;
  costCenter!: string;
  shareHolder!: string;
  tax!: string;
  forex!: string;
  management!:string;
  account!: string;
  paymentFromCompany!: string;
  paymentToCompany!: string;
  proExpense!: string;
  proInv!: string;
  proExpenseList!: string;
  invoice!: string;
  bank!: string;
  bankBranch!: string;
  bankAccount!: string;
  cheque!: string;
  customer!: string;
  accountConfiguration!: string;
  accounting!: string;
  config!: string;
  paymentAndReceipt!: string;
  supplier!: string;
  suppForex!:string
  sales!: string;
  inventory!: string;
  product!: string;
  productCategory!: string;
  productGroup!: string;
  productUnit!: string;
  productPricing!: string;
  CRM!: string;
  productUnitConversion!: string;
  warehouse!: string;
  stockIn!: string;
  stockMovement!: string;
  logout!: string;
  booking!: string
  partTrans!:string
  change!: string;
  transGood!:string
  partner!: string
  containerProducts!: string
  invoicePartners!: string
  transportedGood !: string
  lead !: string
  leadcre !: string
  leadqua !: string
  leaddis !: string
  leadass !: string
  leadfollow !: string
  financialYearManagement! : string
  fiscalYear !: string
  accountOpeningBalance! : string
  stockOpening !: string
  payment !: string
  receipt !: string
  customerOpeningBalance! : string
  supplierOpeningBalance !: string
  reports !: string
  financialReports! : string

  resizeStyle: object = {};

  isOpen_YourVariable = true;

  nlast: any = {
    records: [],
    auditColumn: this._auth.getAuditColumns()
  }


  

  navigation!: string;
  role = localStorage.getItem("role");

  userName!: string;
  userEmail!: string;
  
  testArray = [
    { id: 1, message: "First notification", openNotification: true},
    { id: 2, message: "Second notification", openNotification: false},
    { id: 3, message: "Third notification", openNotification: false}
  ]
  // model: LoginModule = {
  //   'username': 'milesh@markoncs.com',
  //   'password': '123456789',
  //   'loginType': 1
  // }
  changePassword: string;
  campaignManagement: string;
  campaignProfile: string;
  campaignMembers: string;
  campaignBudgeting: string;
  campaignExpenses: string;
  campaignActivities: string;
  langa: boolean;
  callCenter: string;
  userManagement: string;
  users: string;
  crm: string;
  escalation: string;
  escalationExe: string;
  customerManagement: string;
  subSystem: string;
  customers: string;
  policies: string;
  Agent: string;
  endorsements: string;
  catagotries: string;
  supervisors: string;
  technicians: string;
  departments: string;
  tickets: string;
  adminTickets: string;
  dashboard: string;
  report: string;
  admin: string;
  pageData :any;
  newNotification: any;
  hideNotification: boolean = true;
  notSound: number = 0
  model: Send = {
    tableId: 106,
    recordId: 0,
    userId: +this._auth.getUserId(),
    roleId: +localStorage.getItem('role')!,
    languageId: +localStorage.getItem(this._globals.baseAppName + '_language')!
  };
  openPanel1: boolean;
  openPanel2: boolean;
  openPanel3: boolean;
  openPanel4: boolean;
  openPanel5: boolean;

  constructor(private _globals: AppGlobals,
    private _auth: AuthService,
    private titleService: Title,
    private navService: AppNotificationEntryService,
    private _cf: CommonService,
    public dialog: MatDialog,
    private router: Router,) { }
    


ngOnInit(): void {
  this.openPanel1 = false
  this.openPanel2 = false
  this.openPanel3 = false
  this.openPanel4 = false
  this.openPanel5 = false
  
  this.admin = this._auth.getUserId()
  this.userName = this._auth.getUserName();
  this.userEmail = this._auth.getUniqueName();

  this.role = localStorage.getItem("role");
  console.log(this.role);
  this.userName = this._auth.getUserName()

  this.pageData = {
    tableId: 106,
    userId: 26,
    recordsPerPage: 100,
    pageNo: 1,
    sort: 'notTime desc',
    filter: "appUserId=("+ this._auth.getUserId()+")"
  }
  
  this._cf.newGetPageData("AppNotification", this.pageData).subscribe((result) => {
    
    this.newNotification = result
    if (!this.newNotification[0].isRead) {
      this.hideNotification = false
      if (this.newNotification[0].appNotificationId != this.notSound) {
        this.notSound = this.newNotification[0].appNotificationId
        this.playSound('../../../assets/notification-pretty-good.mp3')
      }
    }
    // if (this.newNotification[0].appNotificationId != +localStorage.getItem(this._globals.baseAppName + '_notificationBadgeId')) {
    //   localStorage.setItem(this._globals.baseAppName + '_notificationBadgeId', this.newNotification[0].appNotificationId.toString())
    //   this.hideNotification = false
    //   this.playSound('../../../assets/notification-pretty-good.mp3')
    // }else {
    //   this.hideNotification = true
    // }
    
        console.log(result)
  })
  

  this.resizeStyle = {
    "max-width": `30%`,
  };
  this.home = "Home"
      this.businessP = "Company profile"
      this.journal = "Journals"
      this.changePassword = "Change password"
      this.CRM = "CRM"
      
    // this.userId = this._auth.getUserName()
    this.logout = "Logout"
      this.change = "Language:"
      this.userManagement = "User management"
      this.subSystem = "Sub system"
      this.users = "Users"
      this.crm = "CRM"
      this.customer = "Customer"
      this.escalation = "Escalation"
      this.escalationExe = "Execution"
      this.customerManagement = "Customer management"
      this.customers = "Customers"
      this.policies = "Policies"
      this.Agent = "Agents"
      this.callCenter = "Call center"
      this.endorsements = "Endorsements"
      this.catagotries = "Categories"
      this.supervisors = "Supervisors"
      this.technicians = "Technicians"
      this.departments = "Departments"
      this.tickets = "Tickets"
      this.adminTickets = "Admin tickets"
      this.dashboard = "Dashboards"
      this.reports = "Reports"
      this.report = "Report"
      
      this.changePassword = "Change password"
     
      this.logout = "Logout"
      this.change = "Language:"

  
//   var header = document.getElementById("myDIV");
// var btns = header.getElementsByClassName("side_list_item");
//   var current = document.getElementsByClassName("active");
//   current[0].className = current[0].className.replace(" active", "");
//   btns[this.key].className += " active";

  // this._auth.login(this.model);
  // this._auth.logout();
  localStorage.setItem(this._globals.baseAppName + '_language', this.lang_LS);
  
  console.log(this.navigation);
    this.break =
    window.innerWidth <= 740
      ? false
      : true;
  }

  

  onSignOut() {
    this._auth.logout();
  }

  onBusiness(name: string) {
    this.navigation = "Home"
    localStorage.getItem(this._globals.baseAppName + '_nav');
    var header = document.getElementById("myDIV");
var btns = header!.getElementsByClassName("side_list_item");
  var current = document.getElementsByClassName("active");
  current[0].className = current[0].className.replace(" active", "");
  btns[0].className += " active";
  
  
}
playSound(url:any) {
  const audio = new Audio(url);
  audio.play();
}
startTimer() {
  setInterval(() => {
    this._cf.newGetPageData("AppNotification", this.pageData).subscribe((result) => {
    
      this.newNotification = result
      if (!this.newNotification[0].isRead) {
        this.hideNotification = false
        if (this.newNotification[0].appNotificationId != this.notSound) {
          this.notSound = this.newNotification[0].appNotificationId
          this.playSound('../../../assets/notification-pretty-good.mp3')
        }
      }
      
          console.log(result)
    })
    // this._cf.newGetPageData("AppNotification", this.pageData).subscribe((result) => {
    
    //   this.newNotification = result
    //   if (this.newNotification[0].appNotificationId != +localStorage.getItem(this._globals.baseAppName + '_notificationBadgeId')) {
    //     localStorage.setItem(this._globals.baseAppName + '_notificationBadgeId', this.newNotification[0].appNotificationId.toString())
    //     this.hideNotification = false
    //     this.playSound('../../../assets/notification-pretty-good.mp3')
    //   }
      
    //       console.log(result)
    // })
  },5000)
}

onToggle() {
  this.break = !this.break
}

onChangePassword  () {
    
  const dialogRef = this.dialog.open(ChangePasswordNewComponent, {
    disableClose: true,
    
    data: {}
  });

dialogRef.afterClosed().subscribe(() => {});
};

onNotification() {
  this.hideNotification = true
  for (let i = 0; i < this.newNotification.length; i++) {
    if (!this.newNotification[i].isRead) {
      this.model.recordId = this.newNotification[i].appNotificationId
      console.log("modelUN", JSON.stringify(this.model));
      
      this.navService.Controllers(this.model).subscribe(res => {
          this.nlast.records = res
          this.nlast.records[5].value = "1"
          console.log("editUN", JSON.stringify(this.nlast));
          
      this.navService.EntryE(this.nlast).subscribe(next => {
        this.nlast.records = []
        this.hideNotification = true
      }, error => {
        this.nlast.records = []
        this.hideNotification = true
      })
      })
      
      
    }
    
  }
}

onCancel2(id: number) {
  for (let i = 0; i < this.testArray.length; i++) {
    if (this.testArray[i].id === id) {
      this.testArray[i].openNotification = false
  this.testArray[i+1].openNotification = true
  if (this.testArray[i+1].openNotification) {
    this.playSound('../../../assets/notification-pretty-good.mp3')
  }
    }
    
  }
  
}
onCancel(id: number) {
  this.testArray[id].openNotification = false
  this.testArray[id+1].openNotification = true
  if (this.testArray[id+1].openNotification) {
    this.playSound('../../../assets/notification-pretty-good.mp3')
  }
}
  
openPanels(id: number) {
  if (id == 1) {
    this.openPanel1 = true
    this.openPanel2 = false
    this.openPanel3 = false
    this.openPanel4 = false
    this.openPanel5 = false
    // this.openPanel6 = false
  }else if (id == 2) {
    this.openPanel1 = false
    this.openPanel2 = true
    this.openPanel3 = false
    this.openPanel4 = false
    this.openPanel5 = false
    // this.openPanel6 = false
  }else if (id == 3) {
    this.openPanel1 = false
    this.openPanel2 = false
    this.openPanel3 = true
    this.openPanel4 = false
    this.openPanel5 = false
    // this.openPanel6 = false
  }else if (id == 4) {
    this.openPanel1 = false
    this.openPanel2 = false
    this.openPanel3 = false
    this.openPanel4 = true
    this.openPanel5 = false
    // this.openPanel6 = false
  }else if (id == 5) {
    this.openPanel1 = false
    this.openPanel2 = false
    this.openPanel3 = false
    this.openPanel4 = false
    this.openPanel5 = true
    // this.openPanel6 = false
  }
}

  onClickListItem(event: string) {
    if(event == 'H' ) {
      this.navigation = "Home"
      var header = document.getElementById("myDIV");
      var btns = header!.getElementsByClassName("side_list_item");
      var current = document.getElementsByClassName("active");
  current[0].className = current[0].className.replace(" active", "");
  btns[0].className += " active";
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Home clicked", this.navigation);
    }else if(event == 'A' ) {
      this.navigation = "Account"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Account clicked", this.navigation);
    }else if(event == 'T' ) {
      this.navigation = "Tax"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Tax clicked", this.navigation);
    }else if(event == 'F' ) {
      this.navigation = "Forex"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Forex clicked", this.navigation);
    }
    else if(event == 'BP' ) {
      this.navigation = "BusinessProfile"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Bussiness Profile clicked", this.navigation);
    }
    else if(event == 'J' ) {
      this.navigation = "JournalEntry"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Journal entry clicked", this.navigation);
    }else if(event == 'SF' ) {
      this.navigation = "SuppForex"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Journal entry clicked", this.navigation);
    }else if(event == 'E' ) {
      this.navigation = "Expense"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'ED' ) {
      this.navigation = "ExpenseDynamic"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'AC' ) {
      this.navigation = "AccountConfig"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("AccountConfig entry clicked", this.navigation);
    }else if(event == 'PEX' ) {
      this.navigation = "ProExpense"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("AccountConfig entry clicked", this.navigation);
    }else if(event == 'PIN' ) {
      this.navigation = "ProInv"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("AccountConfig entry clicked", this.navigation);
    }else if(event == 'PEXL' ) {
      this.navigation = "ProExpenseList"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("AccountConfig entry clicked", this.navigation);
    }else if(event == 'C' ) {
      this.navigation = "Customer"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'P' ) {
      this.navigation = "Product"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'SUB' ) {
      this.navigation = "Supplier"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'PC' ) {
      this.navigation = "ProductCat"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'PG' ) {
      this.navigation = "ProductGroup"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'PU' ) {
      this.navigation = "ProductUnit"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    // }else if(event == 'PUC' ) {
    //   this.navigation = "ProductUnitCon"
    //   localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
    //   console.log("Expense entry clicked", this.navigation);
    }else if(event == 'W' ) {
      this.navigation = "WareHouse"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'B' ) {
      this.navigation = "Bank"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'BB' ) {
      this.navigation = "BankBranch"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'BA' ) {
      this.navigation = "BankAccount"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'I' ) {
      this.navigation = "Invoice"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'PFC' ) {
      this.navigation = "PaymentFromCompany"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'PTC' ) {
      this.navigation = "PaymentToCompany"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'PP' ) {
      this.navigation = "ProductPricing"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'SI' ) {
      this.navigation = "StockIn"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'SM' ) {
      this.navigation = "StockMovement"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'JD' ) {
      this.navigation = "JournalDynamic"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'TA' ) {
      this.navigation = "CRM"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'FR' ) {
      this.navigation = "FinancialReports"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'FRP' ) {
      this.navigation = "FinancialReportsPage"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'CTC' ) {
      this.navigation = "Cheque"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'Charts' ) {
      this.navigation = "Charts"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'ECharts' ) {
      this.navigation = "ECharts"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'TG' ) {
      this.navigation = "TransGood"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'BK' ) {
      this.navigation = "Booking"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'PR' ) {
      this.navigation = "Partner"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'PT' ) {
      this.navigation = "PartTrans"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'IP' ) {
      this.navigation = "Invoice partners"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'CP' ) {
      this.navigation = "Container loading"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'TDG' ) {
      this.navigation = "Transported good"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'FY' ) {
      this.navigation = "Fiscal year"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'AOB' ) {
      this.navigation = "Account opening balance"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'CO' ) {
      this.navigation = "Company"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'SH' ) {
      this.navigation = "ShareHolder"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'CC' ) {
      this.navigation = "CostCenter"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'SO' ) {
      this.navigation = "Stock opening"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'PAY' ) {
      this.navigation = "payment"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'RES' ) {
      this.navigation = "receipt"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'COB' ) {
      this.navigation = "Customer opening balance"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'SOB' ) {
      this.navigation = "Supplier opening balance"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }
  }

  onClickHome() {
    this.router.navigate(['/System/Home']);
  }

  onChangeLanguage() {
    this.navigation = "Home"
    this.router.navigate(['/System/Home']);
    var header = document.getElementById("myDIV");
    var btns = header!.getElementsByClassName("side_list_item");
      var current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      btns[0].className += " active";
      if (localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
        this.lang = "Arabic"
        this.direction = "ltr"
        this.langa = true
        this.changePassword = "Change password"
        this.logout = "Logout"
        this.change = "Language:"
        this.callCenter = "Call center"
        this.userManagement = "User management"
        this.users = "Users"
        this.crm = "CRM"
        this.customer = "Customer"
        this.escalation = "Escalation"
        this.escalationExe = "Execution"
        this.customerManagement = "Customer management"
        this.subSystem = "Sub system"
        this.customers = "Customers"
        this.policies = "Policies"
        this.Agent = "Agents"
        this.endorsements = "Endorsements"
        this.catagotries = "Categories"
        this.supervisors = "Supervisors"
        this.technicians = "Technicians"
        this.departments = "Departments"
        this.tickets = "Tickets"
        this.adminTickets = "Admin tickets"
        this.dashboard = "Dashboards"
        this.reports = "Reports"
        this.report = "Report"
        
        
        this.lang_LS = "16001"
      }else if (localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
        this.lang = "الانجليزية"
        this.lang_LS = "16002"
        this.direction = "rtl"
        this.langa = false
        this.changePassword = "تغيير كلمة السر"
        this.callCenter = "مركز التواصل"
        this.logout = "تسجيل الخروج"
        this.change = "اللغة:"
        this.Agent = "العميل"
        this.userManagement = "ادارة المستخدمين"
        this.users = "المستخدمين"
        this.crm = "ادارة العملاء"
        this.customer = "العميل"
        this.escalation = "التصعيد"
        this.escalationExe = "التنفيذ"
        this.subSystem = "نظام بديل"
        this.customerManagement = "ادارة العملاء"
        this.customers = "العملاء"
        this.policies = "البوليصات"
        this.endorsements = "الضمانات"
        this.catagotries = "التصنيفات"
        this.supervisors = "المشرفون"
        this.technicians = "التقنيون"
        this.departments = "الاقسام"
        this.tickets = "التذاكر"
        this.adminTickets = "تذاكر الادمن"
        this.dashboard = "الاحصائيات"
        this.reports = "Reports"
        this.report = "Report"
        
        this.lang_LS = "16002"
  
  
  
  
  
      }else if (localStorage.getItem(this._globals.baseAppName + '_language') == "") {
        this.lang = "Arabic"
        this.direction = "ltr"
        this.changePassword = "Change password"
        this.logout = "Logout"
        this.change = "Change to:"
        this.subSystem = "Sub system"
        this.callCenter = "Call center"
        this.userManagement = "User management"
        this.users = "Users"
        this.crm = "CRM"
        this.customer = "Customer"
        this.escalation = "Escalation"
        this.escalationExe = "Execution"
        this.customerManagement = "Customer management"
        this.customers = "Customers"
        this.Agent = "Agents"
        this.policies = "Policies"
        this.endorsements = "Endorsements"
        this.catagotries = "Catagories"
        this.supervisors = "Supervisors"
        this.technicians = "Technicians"
        this.departments = "Departments"
        this.tickets = "Tickets"
        this.adminTickets = "Admin tickets"
        this.dashboard = "Dashboards"
        this.reports = "Reports"
        this.report = "Report"
        
        
        this.lang_LS = "16001"
      }
    localStorage.setItem(this._globals.baseAppName + '_language', this.lang_LS);
    console.log("lang: ",localStorage.getItem(this._globals.baseAppName + '_language'))
    
  }

  checkEng(){
    return (localStorage.getItem(this._globals.baseAppName + '_language') == '16002')
      
  }

  resizeEdges(){
    if(localStorage.getItem(this._globals.baseAppName + '_language') == '16001'){
      return {right: true}
    } else {return{left: true}}
  }

  onResize(event: any){
    this.break =
    window.innerWidth <= 740
      ? false
      : true;
  }
  resizeValidate(event: ResizeEvent): boolean {
    const MIN_DIMENSIONS_PX: number = 50;
    if (
      event.rectangle.width &&
      event.rectangle.height &&
      (event.rectangle.width < MIN_DIMENSIONS_PX ||
        event.rectangle.height < MIN_DIMENSIONS_PX)
    ) {
      return false;
    }
    return true;
  }
 
                    /**
                     * Finilizes resize positions
                     * (used for drawer/sidenav width)
                     * @param event 
                     */
  onResizeEnd(event: ResizeEvent): void {
    console.log(event);
    
    this.resizeStyle = {
                     // enable/disable these per your needs
      // position: 'fixed',
      // left: `${event.rectangle.left}px`,
      // top: `${event.rectangle.top}px`,
      // height: `${event.rectangle.height}px`,
      width: `${event.rectangle.width}px`,
    };
  }

}
