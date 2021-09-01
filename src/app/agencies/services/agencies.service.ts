import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { Agency } from '../interfaces/agency.interface';

@Injectable({
  providedIn: 'root',
})
export class AgenciesService {
  private _baseUrl: string = environment.agenciesEndpoint;

  constructor(private http: HttpClient) {}

  get baseUrl() {
    return this._baseUrl;
  }

  getAgencies(): Observable<Agency[]> {
    return this.http.get<Agency[]>(`${this.baseUrl}/agencies`);
  }

  getById(id: string): Observable<Agency> {
    return this.http.get<Agency>(`${this.baseUrl}/agencies/${id}`);
  }

  create(agency: Agency): Observable<Agency> {
    return this.http.post<Agency>(`${this.baseUrl}/agencies`, agency);
  }

  update(agency: Agency): Observable<Agency> {
    return this.http.put<Agency>(`${this.baseUrl}/agencies/${agency.id}`, agency);
  }

  delete( id: string ): Observable<any> {
    return this.http.delete<any>(`${ this.baseUrl }/agencies/${ id }`);
  }
}
