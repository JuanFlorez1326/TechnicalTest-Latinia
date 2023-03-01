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
  
  searchCharacter( character: string ): Observable<Character> {
    const url = `${api.url}?name=${character}&ts=1&apikey=${api.key}&hash=${api.hash}`;
    return this.http.get<Character>(url);
  }

  getAllCharacters(): Observable<Character> {
    const url = `${api.url}?ts=1&apikey=${api.key}&hash=${api.hash}`;
    return this.http.get<Character>(url);
  }

  getCharacterById( id: string ): Observable<Character> {
    const url = `${api.url}/${id}?ts=1&apikey=${api.key}&hash=${api.hash}`;
    return this.http.get<Character>(url);
  }

  getComicsByCharacterId( id: string ): Observable<Comic> {
    const url = `${api.url}/${id}/comics?orderBy=-focDate&ts=1&apikey=${api.key}&hash=${api.hash}&limit=6`;
    return this.http.get<Comic>(url);
  }

  getComicsByFormatAndCharacterId( id: string, format: string ): Observable<Comic> {
    const url = `${api.url}/${id}/comics?format=${format}&orderBy=-focDate&ts=1&apikey=${api.key}&hash=${api.hash}&limit=6`;
    return this.http.get<Comic>(url);
  }

  getStoriesByCharacterId( id: string ): Observable<Stories> {
    const url = `${api.url}/${id}/stories?orderBy=-id&ts=1&apikey=${api.key}&hash=${api.hash}&limit=5`;
    return this.http.get<Stories>(url);
  }

  getSuggestions( term: string, limit: string ): Observable<Character> {
    const url = `${api.url}?nameStartsWith=${term}&orderBy=name&ts=1&apikey=${api.key}&hash=${api.hash}&limit=${limit}`;
    return this.http.get<Character>(url);
  }
}