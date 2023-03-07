import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppGlobals } from '../app.global';
import { SelectService } from '../components/common/select.service';
import { MessageBoxService } from '../components/messagebox/message-box.service';
import { AuthService } from '../components/security/auth/auth.service';
import { UIService } from '../components/shared/uiservices/UI.service';
import { GlobalSerivce } from '../global-functions.service';
import { TicketService } from '../Ticketing/ticket/ticket.service';

@Component({
  selector: 'app-url-ticket',
  templateUrl: './url-ticket.component.html',
  styleUrls: ['./url-ticket.component.scss']
})
export class UrlTicketComponent implements OnInit {

  comments: any[]
  private routeSub: Subscription;
  constructor(
        private _ui: UIService,
        private _msg: MessageBoxService,
        private _globals: AppGlobals,
        private _globalFun: GlobalSerivce,
        private _auth: AuthService,
        private _select: SelectService,
        private route: ActivatedRoute,
        private ticketservice: TicketService
  ) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      console.log(params['id']) //log the value of id
     
      this._ui.loadingStateChanged.next(true);
    this.ticketservice.getComments(Number(params['id'])).subscribe((response) => {
      console.log(response);
      
      this._ui.loadingStateChanged.next(false);
      this.comments = response
      this.comments.forEach((com) => {
        com.crDate = com.crDate.replace('T', ' ')
        if (com.commentType === "ATTACH") {
          com.apiImagePath = this._globals.baseAPIFileUrl + com.apiImagePath
        }
      })
      // console.log(this.comments);
      
      // this.comments.forEach((com) => {
      //   com.edit = false
      // })
    })
    });
    
  }

}
