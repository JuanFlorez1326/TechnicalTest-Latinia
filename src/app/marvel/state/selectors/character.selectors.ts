import { createSelector } from '@ngrx/store';
import { CharacterState } from '../../interfaces/characters.state';
import { CharactersState } from '../character.state';

export const selectCharacterFeature = ( state: CharactersState ) => state.character;

export const selectCharacters = createSelector(
    selectCharacterFeature,
    ( state: CharacterState ) => state.characters
);

export const selectLoading = createSelector(
    selectCharacterFeature,
    ( state: CharacterState ) => state.loading
);