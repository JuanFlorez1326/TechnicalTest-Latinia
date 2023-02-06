import { Component} from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete'

import { MarvelService } from '../../services/marvel.service';
import { Character, ResultCharacter } from '../../interfaces/characters.interface';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styles: [ ` app-search-results { display: flex; margin: auto; } `]
})
export class SearchInputComponent {

  constructor(
    private readonly marvelService: MarvelService
  ) { 
    if( localStorage.getItem('lastCharacter') ) {
      this.selectedCharacter = JSON.parse( localStorage.getItem('lastCharacter')! );
    }
  }
  
  term: string = '';
  characters: ResultCharacter[] = [];
  selectedCharacter!: ResultCharacter[] | undefined;

  searchCharacters() {
    this.marvelService.getSuggestions(this.term)
      .subscribe( 
        (res: Character ) => {
          this.characters = res.data.results;
        }
      );
  }

  selectedOption( event: MatAutocompleteSelectedEvent ) {

    if( !event.option.value ) { 
      this.selectedCharacter = undefined;
      return; 
    }
    
    const character = event.option.value;
    this.term = character.name;

    this.marvelService.getCharacterById(character.id)
      .subscribe( ( res: Character ) => {
        this.selectedCharacter = res.data.results;
        localStorage.setItem('lastCharacter', JSON.stringify(this.selectedCharacter));
      }
    );
  }
}