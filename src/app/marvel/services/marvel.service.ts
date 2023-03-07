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

  getCharacters( id?: string ): Observable<Character> {
    const url = id 
      ? `${api.url}/${id}?ts=1&apikey=${api.key}&hash=${api.hash}` 
      : `${api.url}?ts=1&apikey=${api.key}&hash=${api.hash}`;

    return this.http.get<Character>(url);
  }

  getComicsById( id: string, format?: string ): Observable<any> {
    
    // const httpOptions: any = {
    //   params: {
    //     format,
    //   },
    //   headers: {}
    // }

    const url = format 
      ? `${api.url}/${id}/comics?format=${format}&orderBy=-focDate&ts=1&apikey=${api.key}&hash=${api.hash}&limit=6`
      : `${api.url}/${id}/comics?orderBy=-focDate&ts=1&apikey=${api.key}&hash=${api.hash}&limit=6`;

    return this.http.get<Comic>(url, /*httpOptions*/);
  }

  getStoriesById( id: string ): Observable<Stories> {
    const url = `${api.url}/${id}/stories?orderBy=-id&ts=1&apikey=${api.key}&hash=${api.hash}&limit=6`;
    return this.http.get<Stories>(url);
  }

  searchCharacter( term: string, limit: number ): Observable<Character> {
    const url = `${api.url}?orderBy=name&ts=1&apikey=${api.key}&hash=${api.hash}&nameStartsWith=${term}&limit=${limit}`;
    return this.http.get<Character>(url);
  }
}