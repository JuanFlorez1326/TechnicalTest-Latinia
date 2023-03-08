import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment as api } from 'src/environments/environmet';
import { Character } from '../interfaces/characters.interface';
import { Comic } from '../interfaces/comics.interface';
import { Stories } from '../interfaces/stories.interface';

@Injectable({
  providedIn: 'root'
})
export class MarvelService {

  constructor( 
    private readonly http: HttpClient 
  ) {}

  getAllCharacters(): Observable<Character> {
    const url = `${api.url}?ts=1&apikey=${api.key}&hash=${api.hash}`;
    return this.http.get<Character>(url);
  }

  getCharacter( id: string ): Observable<Character> {
    const url = `${api.url}/${id}?ts=1&apikey=${api.key}&hash=${api.hash}`;
    return this.http.get<Character>(url);
  }

  getComicsById( id: string, headersParams: { format?: string } = {} ): Observable<Comic> {
    const httpOptions = {
      params: { orderBy: '-focDate', ts: 1, apikey: api.key, hash: api.hash, limit: 6 }
    }

    httpOptions.params = { ...httpOptions.params, ...headersParams }
    const url = `${api.url}/${id}/comics`;
    return this.http.get<Comic>( url, httpOptions );
  }

  getStoriesById( id: string ): Observable<Stories> {
    const httpOptions  = {
      params: { orderBy: '-id', ts: 1, apikey: api.key, hash: api.hash, limit: 6 }
    }

    httpOptions.params = { ...httpOptions.params }
    const url = `${api.url}/${id}/stories`;
    return this.http.get<Stories>( url, httpOptions );
  }

  searchCharacter( nameStartsWith: string, limit: number ): Observable<Character> {
    const httpOptions = {
      params: { orderBy: 'name', ts: 1, apikey: api.key, hash: api.hash, limit, nameStartsWith }
    }

    httpOptions.params = { ...httpOptions.params }
    const url = `${api.url}`;
    return this.http.get<Character>( url, httpOptions );
  }
}