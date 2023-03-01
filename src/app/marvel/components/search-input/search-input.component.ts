import { Component} from '@angular/core';

import { MarvelService } from '../../services/marvel.service';
import { Character, ResultCharacter } from '../../interfaces/characters.interface';
import { map } from 'rxjs';

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
    .pipe( map( (res: Character) => res.data.results ) )
    .subscribe( characters => this.characters = characters );
  }
}