import { Component} from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete'

import { MarvelService } from '../../services/marvel.service';
import { Character, ResultCharacter } from '../../interfaces/characters.interface';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent {

  constructor(
    private readonly marvelService: MarvelService
  ) {}
  
  term: string = '';
  characters: ResultCharacter[] = [];
  limit: string = '2';

  searchCharacters() {
    this.marvelService.getSuggestions(this.term, this.limit)
      .subscribe(
        (res: Character) => {
          this.characters = res.data.results;
        }
      );
  }
}