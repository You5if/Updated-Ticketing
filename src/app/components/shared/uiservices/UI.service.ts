import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MessageBoxService } from '../../messagebox/message-box.service';

@Injectable({
  providedIn: 'root'
})
export class UIService {
  loadingStateChanged = new Subject<boolean>();
  notDone:boolean
constructor(private _msg:MessageBoxService) {
  this.loadingStateChanged.subscribe((res)=>{
    if (res){
      this.callTimeOut()
    }else{
      this.notDone=false
    }
  })
 }

callTimeOut(){
  this.notDone=true
setTimeout(()=>{
  if(this.notDone){
    this.loadingStateChanged.next(false)
    this._msg.showError("timeout")
  }
},15000)
}

}
