import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { MarvelService } from '../../services/marvel.service';
import { Character, ResultCharacter } from '../../interfaces/characters.interface';
import { loadCharacters, loadCharactersSuccess } from '../../state/actions/character.actions';
import { selectLoading } from '../../state/selectors/character.selectors';
import { CharactersState } from '../../state/character.state';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent  {

  constructor(
    private readonly marvelService: MarvelService,
    private readonly store: Store<CharactersState>
  ) {}

  loading$: Observable<boolean> = new Observable();

  term: string = '';
  characters: ResultCharacter[] = [];
  limit: string ='2';

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