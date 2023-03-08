import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscribable } from 'rxjs';
import { ResultCharacter } from '../../interfaces/characters.interface';
import { Store } from '@ngrx/store';
import { CharactersState } from '../../state/character.state';
import { selectCharacters } from '../../state/selectors/character.selectors';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  constructor(
    private readonly store: Store<CharactersState>
  ) { }

  @Input('card-characters') characters$!: Observable<readonly ResultCharacter[]> | Subscribable<readonly ResultCharacter[]> | Promise<readonly ResultCharacter[]> | null | undefined;
  //characters$: Observable< readonly ResultCharacter[] > = new Observable();
  
  ngOnInit(): void {
    this.characters$ = this.store.select(selectCharacters);
  }
}