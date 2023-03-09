import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MarvelState } from '../../marvel-state/character.state';
import { selectCharacters } from '../../marvel-state/selectors/character.selectors';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  constructor( private readonly store: Store<MarvelState>) {}
  @Input('card-characters') characters$!: any;
  ngOnInit(): void { this.characters$ = this.store.select(selectCharacters) }
}