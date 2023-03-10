import * as fromActions from '../actions/comics.actions';
import { ComicsActionTypes } from '../actions/comics.actions';
import { ResultComic } from '../../interfaces/comics.interface';
import { ResultCharacter } from '../../interfaces/characters.interface';
import { ResultStory } from '../../interfaces/stories.interface';

export interface ComicsState {
    comics: ResultComic[] |  ResultCharacter[] | ResultStory[];
    error: string;
}

export const initialComicsState: ComicsState = {
    comics: [],
    error: ''
};

export function comicsReducer(state = initialComicsState, action: fromActions.ComicsActions): ComicsState {
    switch (action.type) {
        case ComicsActionTypes.LoadComicsSuccess:
            return {
                ...state,
                comics: action.payload.comics
            };
        case ComicsActionTypes.LoadComicsFailure:
            return {
                ...state,
                error: action.payload.error
            };
        default:
            return state;
    }
}

export const getComics = (state: ComicsState) => state.comics;
export const getError = (state: ComicsState) => state.error;