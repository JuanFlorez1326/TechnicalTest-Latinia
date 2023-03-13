import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY, map, mergeMap, catchError } from "rxjs";
import { MarvelService } from "../../services/marvel.service";

@Injectable({
    providedIn: "root"
})
export class CharacterEffects {

    constructor(
        private actions$: Actions, 
        private marvelService: MarvelService
    ) { }

    loadCharactersSuccess$ = createEffect(() => this.actions$.pipe(
        ofType('[Character] Load Characters'),
        mergeMap(() => this.marvelService.getAllCharacters()
            .pipe(
                map(characters => ({ type: '[Character] Load Characters Success', characters })),
                catchError(() => EMPTY)
            )
        )
    ));
}