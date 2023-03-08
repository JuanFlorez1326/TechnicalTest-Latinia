import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment as api } from 'src/environments/environmet';
import { ApiResponse } from '../interfaces/api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class MarvelService {

  constructor( 
    private readonly http: HttpClient 
  ) {}

  getAllCharacters(): Observable<ApiResponse> {
    const url = `${api.url}?ts=1&apikey=${api.key}&hash=${api.hash}`;
    return this.http.get<ApiResponse>(url);
  }

  getCharacter( id: string ): Observable<ApiResponse> {
    const url = `${api.url}/${id}?ts=1&apikey=${api.key}&hash=${api.hash}`;
    return this.http.get<ApiResponse>(url);
  }

  getComicsById( id: string, headersParams: { format?: string } = {} ): Observable<ApiResponse> {
    const httpOptions = {
      params: { orderBy: '-focDate', ts: 1, apikey: api.key, hash: api.hash, limit: 6 }
    }

    httpOptions.params = { ...httpOptions.params, ...headersParams }
    const url = `${api.url}/${id}/comics`;
    return this.http.get<ApiResponse>( url, httpOptions );
  }

  getStoriesById( id: string ): Observable<ApiResponse> {
    const httpOptions  = {
      params: { orderBy: '-id', ts: 1, apikey: api.key, hash: api.hash, limit: 6 }
    }

    httpOptions.params = { ...httpOptions.params }
    const url = `${api.url}/${id}/stories`;
    return this.http.get<ApiResponse>( url, httpOptions );
  }

  searchCharacter( nameStartsWith: string, limit: number ): Observable<ApiResponse> {
    const httpOptions = {
      params: { orderBy: 'name', ts: 1, apikey: api.key, hash: api.hash, limit, nameStartsWith }
    }

    httpOptions.params = { ...httpOptions.params }
    const url = `${api.url}`;
    return this.http.get<ApiResponse>( url, httpOptions );
  }
}