import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})

export class HotelsService {

  public api: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getToken(): Observable<any> {
    return this.http.post(`${this.api}`, {}).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    )
  }

  getAllHotels(): Observable<any> {
    return this.http.get(`${this.api}/`).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  getHotelById(id: string): Observable<any> {
    return this.http.get(`${this.api}/${id}`).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  creteHotel(newHotel: any): Observable<any> {
    return this.http.post(`${this.api}/`, { ...newHotel }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  updateHotel(id: string, hotel: any): Observable<any> {
    return this.http.put(`${this.api}/${id}`, { ...hotel }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  deleteHotel(id: string): Observable<any> {
    return this.http.delete(`${this.api}/${id}`).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  filterHotels(params: any): Observable<any> {
    // Construir los parámetros de la solicitud
    let queryParams = new HttpParams();
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        queryParams = queryParams.set(key, params[key]);
      }
    }

    return this.http.get(`${this.api}/hotels/filter`, { params: queryParams }).pipe(
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
