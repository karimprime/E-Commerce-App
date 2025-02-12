import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Env } from '../../../Environment/Environment';
import { ICategoriesResponse, ICategory } from '../../../../shared/interface/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private httpClient = inject(HttpClient);
  constructor() { }

  getAllCategories(): Observable<ICategoriesResponse> {
    return this.httpClient.get<ICategoriesResponse>(`${Env.baseApiUrl}/api/v1/categories`);
  }

  getSpecificCategory(cId: string): Observable<ICategory> {
    return this.httpClient.get<ICategory>(`${Env.baseApiUrl}/api/v1/categories/${cId}`);
  }
}
