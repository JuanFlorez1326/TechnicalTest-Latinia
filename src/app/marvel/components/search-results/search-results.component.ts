import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCharacters } from '../../state/selectors/character.selectors';
import { CharactersState } from '../../state/character.state';
import { ResultCharacter } from '../../interfaces/characters.interface';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  constructor(
    private readonly store: Store<CharactersState>
  ) { }

  characters$: Observable< readonly ResultCharacter[] > = new Observable();

  ngOnInit(): void {
    this.characters$ = this.store.select(selectCharacters);
  }
}