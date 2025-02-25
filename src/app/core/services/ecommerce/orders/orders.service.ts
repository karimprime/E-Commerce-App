import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Env } from '../../../Environment/Environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private readonly httpClient = inject(HttpClient);
  constructor() { }

  cashOrders(id: string, shippingAddress: { details: string, phone: number, city: string }): Observable<any> {
    return this.httpClient.post(`${Env.baseApiUrl}/api/v1/orders/${id}`, { shippingAddress });
  }

  getAllOrders(): Observable<any> {
    return this.httpClient.get(`${Env.baseApiUrl}/api/v1/orders`);
  }

  getUserOrders(id: string): Observable<any> {
    return this.httpClient.get(`${Env.baseApiUrl}/api/v1/orders/${id}`);
  }

  onlinePayment(id: string, shippingAddress: { details: string, phone: number, city: string }): Observable<any> {
    return this.httpClient.post(`${Env.baseApiUrl}/api/v1/orders/checkout-session/${id}?url=${Env.domain}`, { shippingAddress });
  }
}



