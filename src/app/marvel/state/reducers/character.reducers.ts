import { createReducer, on } from '@ngrx/store';
import { CharacterState } from '../../interfaces/characters.state';
import { loadCharacters, loadCharactersSuccess } from '../actions/character.actions';

export const initialState: CharacterState = { loading: false, characters: [] }; 

export const characterReducer = createReducer(
    initialState,
    on( loadCharacters, ( state ) => {
        return { ...state, loading: true };
    }),
    on( loadCharactersSuccess, ( state, { characters } ) => {
        return { ...state, loading: false, characters: [ ...characters ] };
    })
);