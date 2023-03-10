import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of, switchMap } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as fromActions from '../actions/comics.actions';
import { MarvelService } from '../../services/marvel.service';
import { ResultComic } from '../../interfaces/comics.interface';
import { Action } from '@ngrx/store';
import { ApiResponse } from '../../interfaces/api-response.interface';

@Injectable({
    providedIn: 'root'
})
export class ComicsEffects {

    constructor(
        private actions$: Actions,
        private marvelService: MarvelService
    ) {}

    loadComics$: Observable<Action> = createEffect(() => {
        return this.actions$.pipe(
            ofType(fromActions.ComicsActionTypes.LoadComicsSuccess),
            tap( (action: any) => console.log(action.payload.comics)),
            map( (action: any) => action.payload.comics),
            switchMap( (comics: ResultComic[]) => {
                return this.marvelService.getComicsById( comics[0].id )
                .pipe(
                    map( (res: ApiResponse) => {
                        return new fromActions.LoadComicsSuccess({ comics: res.data.results });
                    }),
                    catchError( (error: any) => {
                        return of(new fromActions.LoadComicsFailure({ error: error.message }));
                    })
                )
            })
        );
    })
}