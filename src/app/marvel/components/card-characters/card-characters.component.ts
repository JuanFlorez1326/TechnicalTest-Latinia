import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MarvelState } from '../../marvel-state/character.state';
import { selectCharacters } from '../../marvel-state/selectors/character.selectors';

@Component({
  selector: 'app-search-results',
  templateUrl: './card-characters.component.html',
  styleUrls: ['./card-characters.component.scss']
})
export class CardCharactersComponent implements OnInit {

  constructor( private readonly store: Store<MarvelState>) {}
  @Input('card-characters') characters$!: any;
  ngOnInit(): void { this.characters$ = this.store.select(selectCharacters) }
}