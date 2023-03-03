import { createReducer, on } from '@ngrx/store';
import { CharacterState } from '../../interfaces/characters.state';
import { loadCharactersSuccess } from '../actions/character.actions';

export const initialState: CharacterState = { loading: false, characters: [] }; 

export const characterReducer = createReducer(
    initialState,
    on( loadCharactersSuccess, ( state, { characters } ) => {
        return { ...state, characters: [ ...characters ] };
    }),
);