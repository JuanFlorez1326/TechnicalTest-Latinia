import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Character, ResultCharacter } from '../../interfaces/characters.interface';
import { MarvelService } from '../../services/marvel.service';

@Component({
  selector: 'app-all-characters',
  templateUrl: './all-characters.component.html'
})
export class AllCharactersComponent implements OnInit {

  constructor(
    private readonly marvelService: MarvelService
  ) { }

  characters: ResultCharacter[] = [];

  ngOnInit(): void {
    this.marvelService.getAllCharacters()
    .pipe( map( (res: Character) => res.data.results ) )
    .subscribe( characters => this.characters = characters );
  }
}