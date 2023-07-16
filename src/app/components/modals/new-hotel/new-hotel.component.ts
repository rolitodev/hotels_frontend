import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotelsService } from 'src/app/services/hotels.service';
import { Observable, catchError, tap } from 'rxjs';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-new-hotel',
  templateUrl: './new-hotel.component.html',
  styleUrls: ['./new-hotel.component.css']
})
export class NewHotelComponent {

  public formNewHotel: FormGroup;

  public isLoading: boolean = false;
  public isSubmit: boolean = false;

  constructor(
    private dialogRef: NbDialogRef<NewHotelComponent>, 
    public _fb: FormBuilder, public _hotels: HotelsService, 
    public _notify: NotifyService) {

    this.formNewHotel = this._fb.group({
      name: [null, [Validators.required]],
      address: [null, [Validators.required]],
      city: [null, [Validators.required]],
      country: [null, [Validators.required]],
      stars: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
      description:[null, [Validators.required]]
    });

  }

  registerHotel() {
    this.isSubmit = true;
    if (this.formNewHotel.valid) {
      this.isLoading = true;
      this._hotels.createHotel(this.formNewHotel.getRawValue()).pipe(
        tap((res: any) => {
          this.isLoading = false;
          this.isSubmit = false;
          this._notify.show('success', `Hotel ${res.name}`, 'Se ha registrado correctamente.');
          this.close(true);
        }),
        catchError((err) => {
          this.isLoading = false;
          this.isSubmit = false;
          this._notify.show('danger', '¡Hey!', err.error);
          return new Observable(); // Devuelve un observable vacío o cualquier otro valor por defecto si es necesario
        })
      ).subscribe();
    } else {
      this._notify.show('info', '¡Hey!', 'Debes llenar todos los campos del formulario.')
    }
  }

  get form() {
    return this.formNewHotel.controls;
  }

  numberOnly(event: any) { // Not works good
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 46 || charCode > 57)) {
        return false;
    }
    return true;
}


  close(status: boolean): void {
    this.dialogRef.close({ status });
  }

}
