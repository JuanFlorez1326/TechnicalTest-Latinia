import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Store } from '@ngrx/store';

import { MarvelService } from '../../services/marvel.service';
import { Character, ResultCharacter } from '../../interfaces/characters.interface';
import {  loadCharactersSuccess } from '../../state/actions/character.actions';
import { CharactersState } from '../../state/character.state';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit  {

  constructor(
    private readonly marvelService: MarvelService,
    private readonly store: Store<CharactersState>,
    private readonly formBuilder: FormBuilder
  ) {
    this.buildForm();
  }

  characters: ResultCharacter[] = [];
  searchForm!: FormGroup;
  limit!: number;
  term!: string;
  showTable: boolean = true;

  ngOnInit(): void {
    this.marvelService.getAllCharacters()
    .pipe< ResultCharacter[] >  ( map( (res: Character) => res.data.results ) )
    .subscribe(
      ( response: ResultCharacter[] ) => {
        this.store.dispatch(loadCharactersSuccess({ characters: response }));
      }
    );
  }

  private buildForm(): void {
    this.searchForm = this.formBuilder.group({
      term: ['', [Validators.required]],
      limit: [1, [
          Validators.required, 
          Validators.min(1), 
          Validators.max(10)
        ]
      ]
    });
  }

  saveForm( event: Event ): void {
    event.preventDefault();
    if (this.searchForm.valid) {
      const { term, limit } = this.searchForm.value;
      this.term = term;
      this.limit = limit;
      this.searchCharacters();
    }
  }

  searchCharacters(): void {
    this.marvelService.getSuggestions(this.term, this.limit)
    .pipe< ResultCharacter[] > ( map( (res: Character) => res.data.results ) )
    .subscribe(
      ( characters: ResultCharacter[] ) => {
        this.store.dispatch(loadCharactersSuccess({ characters: characters }));
      }
    );
  }

  showTableCharacters(): void {
    if(this.showTable) {
      this.showTable = false;
    } else {
      this.showTable = true;
    }
  }
}