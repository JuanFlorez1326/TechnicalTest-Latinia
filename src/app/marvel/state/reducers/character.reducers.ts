import { createReducer, on } from '@ngrx/store';
import { CharacterState, ComicState } from '../../interfaces/characters.state';
import { loadCharactersSuccess, loadComicsSuccess } from '../actions/character.actions';

export const initialState: CharacterState = { characters: [] };
export const initialComicState: ComicState = { comics: [] };

export const characterReducer = createReducer(
    initialState,
    on( loadCharactersSuccess, ( state, { characters } ) => {
        return { ...state, characters: [ ...characters ] };
    })
);

export const comicReducer = createReducer(
    initialComicState,
    on( loadComicsSuccess, ( state, { comics } ) => {
        return { ...state, characters: [ ...comics ] };
    })
);