import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { NbLayoutModule, NbThemeModule, NbToastrModule, NbTabsetModule, NbCardModule, 
  NbIconModule, NbButtonModule, NbTooltipModule, NbDialogModule, NbDialogService, NbInputModule, NbFormFieldModule, NbListModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HotelsComponent } from './components/hotels/hotels.component';
import { HttpClientModule } from '@angular/common/http';
import { NewHotelComponent } from './components/modals/new-hotel/new-hotel.component';
import { EditHotelComponent } from './components/modals/edit-hotel/edit-hotel.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HotelsComponent,
    NewHotelComponent,
    EditHotelComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NbThemeModule.forRoot({ name: 'default' }),
    NbToastrModule.forRoot(),
    NbLayoutModule,
    NbTabsetModule,
    NbCardModule,
    NbIconModule,
    NbEvaIconsModule,
    NbButtonModule,
    NbTooltipModule,
    NbDialogModule.forRoot(),
    NbInputModule,
    NbFormFieldModule,
    NbListModule
  ],
  exports: [
    RouterModule
  ],
  providers: [NbDialogService],
  bootstrap: [AppComponent]
})

export class AppModule { }
