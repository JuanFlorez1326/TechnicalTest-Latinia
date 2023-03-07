import { Action } from '@ngrx/store';
import { ResultComic } from '../../interfaces/comics.interface';


export enum CharacterActionTypes {
    LoadComics = '[Character] Load All Comics',
    LoadComicsSuccess = '[Character] Load All Comics Success',
    LoadComicsFailure = '[Character] Load All Comics Failure',
}

export class LoadComics implements Action {
    readonly type = CharacterActionTypes.LoadComics;
    constructor( public payload: { characterId: string } ) {}
}

export class LoadComicsSuccess implements Action {
    readonly type = CharacterActionTypes.LoadComicsSuccess;
    constructor( public payload: { comics: ResultComic[] } ) {}
}

export class LoadComicsFailure implements Action {
    readonly type = CharacterActionTypes.LoadComicsFailure;
    constructor( public payload: { error: string } ) {}
}