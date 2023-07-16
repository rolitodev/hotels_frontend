import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';

import { HotelsService } from 'src/app/services/hotels.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent {

  @Output() public refreshData: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() public hotels: any = [];

  public columns = ['#', 'Nombre Hotel', 'Descripción', 'Estrellas', 'País', 'Ciudad', 'Dirección', 'Fecha Creación', ''];
  public data: any[] = [];

  public nameFilter: string = '';

  constructor(public _hotels: HotelsService, public _notify: NotifyService) { }

  ngOnChanges() {
    if (this.hotels && this.hotels.length > 0) {
      this.data = this.hotels;
    }
  }

  editHotel(id: number): void {
    console.log(id);
  }

  deleteHotel(id: number): void {
    this._hotels.deleteHotel(id).pipe(
      tap((res: any) => {
        if (res) {
          this._notify.show('success', `Eliminado`, 'Se ha removido el hotel seleccionado.');
          this.refreshData.emit(true);
        }
      }),
      catchError((err) => {
        this._notify.show('danger', '¡Hey!', err.error);
        return new Observable(); // Devuelve un observable vacío o cualquier otro valor por defecto si es necesario
      })
    ).subscribe();
  }

  filterName(): void {
    if (this.nameFilter && this.nameFilter.length > 0) {
      this._hotels.filterHotels({ name: this.nameFilter }).pipe(
        tap((res: any) => {
          if (res && res.length > 0) {
            this.data = res;
          } else {
            this._notify.show('danger', '¡Hey!', 'No se encontraron registros con los parámetros ingresados.');
          }
        }),
        catchError((err) => {
          this._notify.show('danger', '¡Hey!', err.error);
          return new Observable(); // Devuelve un observable vacío o cualquier otro valor por defecto si es necesario
        })
      ).subscribe();
    } else {
      this.refreshData.emit(true);
    }

  }

  generateStars(numStars: number): number[] {
    return Array(numStars).fill(0);
  }

}
