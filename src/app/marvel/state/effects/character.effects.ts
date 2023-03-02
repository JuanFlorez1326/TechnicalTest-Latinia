import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { MarvelService } from '../../services/marvel.service';
import { ResultCharacter } from '../../interfaces/characters.interface';

@Injectable()
export class CharacterEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly marvelService: MarvelService
    ) {}

    term: string = '';
    characters: ResultCharacter[] = [];
    limit: string ='2';

    loadCharacters$ = createEffect(() => this.actions$.pipe(
        ofType('[Character] Load Characters'),
        mergeMap(() => this.marvelService.getSuggestions(this.term, this.limit)
            .pipe(
                map(characters => ({ type: '[Character] Load Characters Success', payload: characters })),
                catchError(() => EMPTY)
            )
        )
    ));
}