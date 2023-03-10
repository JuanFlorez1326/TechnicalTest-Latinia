import { Action } from '@ngrx/store';
import { ResultComic } from '../../interfaces/comics.interface';
import { ResultCharacter } from '../../interfaces/characters.interface';
import { ResultStory } from '../../interfaces/stories.interface';

export enum StoriesActionTypes {
    LoadStoriesSuccess = '[Stories] Load Stories Success',
    LoadStoriesFailure = '[Stories] Load Stories Failure'
}

export class LoadStoriesSuccess implements Action {
    readonly type = StoriesActionTypes.LoadStoriesSuccess;
    constructor( public payload: { stories: ResultStory[] | ResultComic[] | ResultCharacter[] } ) {}
}

export class LoadStoriesFailure implements Action {
    readonly type = StoriesActionTypes.LoadStoriesFailure;
    constructor( public payload: { error: string } ) {}
}

export type StoriesActions =
    | LoadStoriesSuccess
    | LoadStoriesFailure;