import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { MarvelService } from '../../services/marvel.service';
import { Character, ResultCharacter } from '../../interfaces/characters.interface';
import { loadCharacters, loadCharactersSuccess } from '../../state/actions/character.actions';
import { selectLoading } from '../../state/selectors/character.selectors';
import { CharactersState } from '../../state/character.state';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent  {

  constructor(
    private readonly marvelService: MarvelService,
    private readonly store: Store<CharactersState>,
    private readonly formBuilder: FormBuilder
  ) {
    this.buildForm();
  }

  loading$: Observable<boolean> = new Observable();
  term!: string;
  characters: ResultCharacter[] = [];
  limit!: number;
  searchForm!: FormGroup;

  private buildForm() {
    this.searchForm = this.formBuilder.group({
      term: ['', [Validators.required]],
      limit: [1, [Validators.required, Validators.min(1), Validators.max(10)]]
    });
  }

  saveForm( event: Event ) {
    event.preventDefault();
    if (this.searchForm.valid) {
      const { term, limit } = this.searchForm.value;
      this.term = term;
      this.limit = limit;
      this.searchCharacters(term);
    }
  }

  searchCharacters( name: string ) {
    if( name && name.length > 0 ) {
      this.loading$ = this.store.select(selectLoading);
      this.store.dispatch(loadCharacters());
      this.marvelService.getSuggestions(this.term, this.limit)
      .pipe( map( (res: Character) => res.data.results ) )
      .subscribe(
        ( characters: ResultCharacter[] ) => {
          this.store.dispatch(loadCharactersSuccess({ characters: characters }));
        }
      );
    } else {
      this.characters = [];
    }
  }
}