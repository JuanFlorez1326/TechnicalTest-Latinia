import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CharactersState } from '../../state/character.state';
import { selectCharacters } from '../../state/selectors/character.selectors';
import { ResultCharacter } from '../../interfaces/characters.interface';

@Component({
  selector: 'app-table-characters',
  templateUrl: './table-characters.component.html',
  styles: [`.container-table { width:95%; margin:auto; }`]
})
export class TableCharactersComponent {
  constructor(
    private readonly store: Store<CharactersState>
  ) {}

  characters$: Observable< readonly ResultCharacter[] > = new Observable();
  displayedColumns: string[] = ['position', 'id', 'date', 'name', 'seemore'];

  ngOnInit(): void {
    this.characters$ = this.store.select(selectCharacters);
  }
}