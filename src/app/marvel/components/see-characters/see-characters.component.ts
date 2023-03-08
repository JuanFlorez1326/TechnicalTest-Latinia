import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map, Subscription, Observable, Subscribable } from 'rxjs';
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
  subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.subscription.add( 
      this.activatedRoute.params
      .pipe< Character, ResultCharacter[] > (
        switchMap( ({ id }) => this.marvelService.getCharacters(id) ),
        map( ( res: Character ) => res.data.results )
      )
      .subscribe(
        ( response: ResultCharacter[] ) => {
          this.character = response;
          this.store.dispatch(loadCharactersSuccess({ characters: response }));
        }
      )
    );
  }

  ngOnDestroy(): void {
    if(this.subscription) this.subscription.unsubscribe(); 
  }
}