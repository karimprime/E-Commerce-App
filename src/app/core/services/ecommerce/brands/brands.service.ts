import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Env } from '../../../Environment/Environment';
import { Brands } from '../../../../shared/interface/brands';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor() { }

  private httpClient = inject(HttpClient);


  getAllBrands(numBrands: number = 15): Observable<Brands> {
    return this.httpClient.get<Brands>(
      `${Env.baseApiUrl}/api/v1/brands?limit=${numBrands}`
    );
  }

  getSpecBrands(bpId: string | null): Observable<Brands> {
    return this.httpClient.get<Brands>(`${Env.baseApiUrl}/api/v1/brands/${bpId}`);
  }
}
