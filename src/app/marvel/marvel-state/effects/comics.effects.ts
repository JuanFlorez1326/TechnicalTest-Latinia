import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import * as fromActions from '../actions/comics.actions';
import { MarvelService } from '../../services/marvel.service';
import { Action } from '@ngrx/store';

@Injectable({
    providedIn: 'root'
})
export class ComicsEffects {

    constructor(
        private actions$: Actions,
        private marvelService: MarvelService
    ) {}

    loadComics$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(fromActions.ComicsActionTypes.LoadComicsSuccess),
        exhaustMap((action: any) => {
            return this.marvelService.getComicsById(action.payload).pipe(
                map((comics: any) => new fromActions.LoadComicsSuccess(comics)),
                catchError(error => of(new fromActions.LoadComicsFailure(error)))
            );
        })
    ));
}