import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map } from 'rxjs';
import { MarvelService } from '../../services/marvel.service';
import { ResultCharacter, Character } from '../../interfaces/characters.interface';
import { Store } from '@ngrx/store';
import { CharactersState } from '../../state/character.state';
import { loadCharactersSuccess } from '../../state/actions/character.actions';

@Component({
  selector: 'app-see-characters',
  templateUrl: './see-characters.component.html',
  styleUrls: ['./see-characters.component.scss']
})
export class SeeCharactersComponent implements OnInit {

  constructor(
    private readonly marvelService: MarvelService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly store: Store<CharactersState>
  ) {}

  character: ResultCharacter[] = [];

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap( ({ id }) => this.marvelService.getCharacterById(id) ),
      map( ( res: Character ) => res.data.results )
    )
    .subscribe(
      ( response: ResultCharacter[] ) => {
        this.character = response;
        this.store.dispatch(loadCharactersSuccess({ characters: response }));
      }
    );
  }
}