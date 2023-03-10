import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import * as fromActions from '../actions/stories.actions';
import { MarvelService } from '../../services/marvel.service';
import { Action } from '@ngrx/store';

@Injectable({
    providedIn: 'root'
})
export class StoriesEffects {

    constructor(
        private actions$: Actions,
        private marvelService: MarvelService
    ) {}

    loadStories$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(fromActions.StoriesActionTypes.LoadStoriesSuccess),
        exhaustMap((action: any) => {
            return this.marvelService.getStoriesById(action.payload).pipe(
                map((stories: any) => new fromActions.LoadStoriesSuccess(stories)),
                catchError(error => of(new fromActions.LoadStoriesFailure(error)))
            );
        })
    ));
}