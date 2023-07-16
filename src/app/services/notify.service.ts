import { Injectable } from '@angular/core';
import { NgxNotificationDirection, NgxNotificationMsgService, NgxNotificationStatusMsg } from 'ngx-notification-msg';

@Injectable({
  providedIn: 'root'
})

export class NotifyService {

  constructor(
    private ngxNotificationMsgService: NgxNotificationMsgService
  ) { }

  show(type: string, message: any, title?: string, delay?: number) {
    let notify: any = {
      messages: (typeof message === 'string' ? [message] : [...message]),
      header: title ? title : null,
      direction: NgxNotificationDirection.TOP_RIGHT,
      delay: delay ? delay : 6000
    };

    switch (type) {
      case "success":
        notify.status = NgxNotificationStatusMsg.SUCCESS;
        break;
      case "info":
      case "warning":
        notify.status = NgxNotificationStatusMsg.INFO;
        break;
      case "error":
        notify.status = NgxNotificationStatusMsg.FAILURE;
        break;
      default:
        notify.status = NgxNotificationStatusMsg.NONE;
        break;
    }

    this.ngxNotificationMsgService.open(notify);

  }

}
