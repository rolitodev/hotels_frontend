import { Component, OnInit } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { HotelsService } from 'src/app/services/hotels.service';
import { NbDialogService } from '@nebular/theme';
import { NewHotelComponent } from '../modals/new-hotel/new-hotel.component';
import { NotifyService } from 'src/app/services/notify.service';
import { config } from '../../utils/modal.tool';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  public hotels: any = [];

  constructor(public _hotels: HotelsService,
    public dialogService: NbDialogService, public _notify: NotifyService) { }

  async ngOnInit() {
    await this._hotels.getToken().subscribe();
    await this.getAllHotelsData();
  }

  getAllHotelsData(): void {
    this._hotels.getAllHotels().pipe(
      tap((res: any) => {
        this.hotels = res;
      }),
      catchError((err) => {
        this._notify.show('danger', '¡Hey!', err.error);
        return new Observable(); // Devuelve un observable vacío o cualquier otro valor por defecto si es necesario
      })
    ).subscribe();
  }

  addHotel(): void {
    this.dialogService.open(NewHotelComponent, config)
      .onClose.subscribe(closed => {
        if (closed.status) {
          this.getAllHotelsData();
        }
      });
  }

  refreshDataReceive(status: boolean) {
    if (status) {
      this.getAllHotelsData();
    }
  }

}
