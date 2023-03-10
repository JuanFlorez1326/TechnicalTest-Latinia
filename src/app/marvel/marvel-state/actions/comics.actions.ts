import { Action } from '@ngrx/store';
import { ResultComic } from '../../interfaces/comics.interface';
import { ResultCharacter } from '../../interfaces/characters.interface';
import { ResultStory } from '../../interfaces/stories.interface';


export enum ComicsActionTypes {
    LoadComicsSuccess = '[Comics] Load Comics Success',
    LoadComicsFailure = '[Comics] Load Comics Failure'
}

export class LoadComicsSuccess implements Action {
    readonly type = ComicsActionTypes.LoadComicsSuccess;
    constructor( public payload: { comics: ResultComic[] | ResultCharacter[] | ResultStory[] } ) {}
}

export class LoadComicsFailure implements Action {
    readonly type = ComicsActionTypes.LoadComicsFailure;
    constructor( public payload: { error: string } ) {}
}

export type ComicsActions = 
    | LoadComicsSuccess 
    | LoadComicsFailure;