import { Component, OnInit } from '@angular/core';
import { Character, ResultCharacter } from '../../interfaces/characters.interface';
import { MarvelService } from '../../services/marvel.service';

@Component({
  selector: 'app-all-characters',
  templateUrl: './all-characters.component.html',
  styleUrls: ['./all-characters.component.scss']
})
export class AllCharactersComponent implements OnInit {

  constructor(
    private readonly marvelService: MarvelService
  ) { }

  characters: ResultCharacter[] = [];

  ngOnInit(): void {
    this.marvelService.getAllCharacters()
    .subscribe(
      ( res: Character ) => {
        this.characters = res.data.results;
      }
    )
  }
}