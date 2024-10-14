// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class ApiService {

//   constructor() { }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://mbalzav.alwaysdata.net/api'; // Cambia esto por la URL de tu API

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/customers`);

  }

  getOrdersByCustomer(customerNumber: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/customers/${customerNumber}/orders`);
  }

  getCustomerById(customerNumber: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/customers/${customerNumber}`);
  }
}