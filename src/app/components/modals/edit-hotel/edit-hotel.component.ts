import { Component, Input, OnInit } from '@angular/core';

import { NbDialogRef } from '@nebular/theme';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotelsService } from 'src/app/services/hotels.service';
import { Observable, catchError, tap } from 'rxjs';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-edit-hotel',
  templateUrl: './edit-hotel.component.html',
  styleUrls: ['./edit-hotel.component.css']
})

export class EditHotelComponent implements OnInit {

  @Input() public data: any;

  public formUpdateHotel: FormGroup;

  public isLoading: boolean = false;
  public isSubmit: boolean = false;

  constructor(private dialogRef: NbDialogRef<EditHotelComponent>,
    public _fb: FormBuilder, public _hotels: HotelsService,
    public _notify: NotifyService) {
    this.formUpdateHotel = this._fb.group({
      _id: [null],
      name: [null, [Validators.required]],
      address: [null, [Validators.required]],
      city: [null, [Validators.required]],
      country: [null, [Validators.required]],
      stars: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
      description: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.formUpdateHotel.controls['_id'].setValue(this.data._id);
    this.formUpdateHotel.controls['name'].setValue(this.data.name);
    this.formUpdateHotel.controls['address'].setValue(this.data.address);
    this.formUpdateHotel.controls['city'].setValue(this.data.city);
    this.formUpdateHotel.controls['country'].setValue(this.data.country);
    this.formUpdateHotel.controls['stars'].setValue(this.data.stars);
    this.formUpdateHotel.controls['description'].setValue(this.data.description);
  }

  updateHotel() {
    this.isSubmit = true;
    if (this.formUpdateHotel.valid) {
      this.isLoading = true;
      this._hotels.updateHotel(this.formUpdateHotel.getRawValue()).pipe(
        tap((res: any) => {
          this.isLoading = false;
          this.isSubmit = false;
          this._notify.show('success', `Hotel ${res.name}`, 'Se ha actualizado correctamente.');
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
      this._notify.show('info', '¡Hey!', 'Debes llenar todos los campos del formulario.');
    }
  }

  numberOnly(event: any) { // Not works good
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 46 || charCode > 57)) {
      return false;
    }
    return true;
  }

  get form() {
    return this.formUpdateHotel.controls;
  }

  close(status: boolean): void {
    this.dialogRef.close({ status });
  }

}
