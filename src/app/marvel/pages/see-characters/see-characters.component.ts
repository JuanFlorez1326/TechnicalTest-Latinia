import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { MarvelService } from '../../services/marvel.service';
import { ResultCharacter, Character } from '../../interfaces/characters.interface';

@Component({
  selector: 'app-see-characters',
  templateUrl: './see-characters.component.html',
  styleUrls: ['./see-characters.component.scss']
})
export class SeeCharactersComponent implements OnInit {

  constructor(
    private readonly marvelService: MarvelService,
    private readonly activatedRoute: ActivatedRoute
  ) { }

  character: ResultCharacter[] = [];

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe<Character> (
      switchMap( ({ id }) =>
        this.marvelService.getCharacterById( id )
      )
    )
    .subscribe(
      (res: Character ) => {
        this.character = res.data.results;
      }
    )
  }
}