import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../environment/environment';
import { header } from '../utils/header.tool';

@Injectable({
  providedIn: 'root'
})

export class HotelsService {

  public api: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getToken(): Observable<any> {
    return this.http.post(`${this.api}/login`, {}).pipe(
      map((response: any) => {
        if (response.token) {
          sessionStorage.setItem('token', response.token);
        }
        return response;
      }),
      catchError(this.handleError)
    )
  }

  getAllHotels(): Observable<any> {
    let token: string = sessionStorage.getItem('token')!;
    let _header: HttpHeaders = header.append('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.api}`, { headers: _header }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  getHotelById(id: string): Observable<any> {
    let token: string = sessionStorage.getItem('token')!;
    let _header: HttpHeaders = header.append('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.api}/${id}`, { headers: _header }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  createHotel(newHotel: any): Observable<any> {
    let token: string = sessionStorage.getItem('token')!;
    let _header: HttpHeaders = header.append('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.api}/`, newHotel, { headers: _header }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  updateHotel(hotel: any): Observable<any> {
    let token: string = sessionStorage.getItem('token')!;
    let _header: HttpHeaders = header.append('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.api}/${hotel._id}`, hotel, { headers: _header }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  deleteHotel(id: number): Observable<any> {
    let token: string = sessionStorage.getItem('token')!;
    let _header: HttpHeaders = header.append('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.api}/${id}`, { headers: _header }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  filterHotels(params: any): Observable<any> {
    let token: string = sessionStorage.getItem('token')!;
    let _header: HttpHeaders = header.append('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.api}/filter`, params, { headers: _header }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

}
