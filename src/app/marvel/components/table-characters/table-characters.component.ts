import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CharactersState } from '../../state/character.state';
import { selectCharacters } from '../../state/selectors/character.selectors';

@Component({
  selector: 'app-table-characters',
  templateUrl: './table-characters.component.html',
  styleUrls: ['./table-characters.component.scss']
})
export class TableCharactersComponent {
  constructor(
    private readonly store: Store<CharactersState>
  ) {}

  characters$: Observable<any> = new Observable();
  displayedColumns: string[] = ['position', 'id', 'date', 'name', 'seemore'];

  ngOnInit(): void {
    this.characters$ = this.store.select(selectCharacters);
  }
}