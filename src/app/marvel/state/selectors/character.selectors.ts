import { createSelector } from '@ngrx/store';
import { CharacterState, ComicState } from '../../interfaces/characters.state';
import { CharactersState } from '../character.state';

export const selectCharacterFeature = ( state: CharactersState ) => state.character;
export const selectComicFeature = ( state: CharactersState ) => state.comic;

export const selectCharacters = createSelector(
    selectCharacterFeature,
    ( state: CharacterState ) => state.characters
);

export const selectComics = createSelector(
    selectComicFeature,
    ( state: ComicState ) => state.comics
);