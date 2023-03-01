import { Component, Input } from '@angular/core';
import { ResultCharacter } from '../../interfaces/characters.interface';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent {
  @Input('card') characters!: ResultCharacter[]
}