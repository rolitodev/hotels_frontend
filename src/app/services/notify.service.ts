import { Injectable } from '@angular/core';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})

export class NotifyService {

  public positions = NbGlobalPhysicalPosition;

  constructor(
    private toastrService: NbToastrService
  ) { }

  show(status: string, message: string, title: string) {
    this.toastrService.show(title, message, { position: this.positions.TOP_RIGHT, status });
  }

}
