import { createSelector } from '@ngrx/store';
import { CharacterState, ComicState, StoryState } from '../interfaces/characters.state';
import { MarvelState } from '../character.state';

export const selectCharacterFeature = ( state: MarvelState ) => state.character;
export const selectComicFeature = ( state: MarvelState ) => state.comic;
export const selectStoryFeature = ( state: MarvelState ) => state.story;

export const selectCharacters = createSelector(
    selectCharacterFeature,
    ( state: CharacterState ) => state.characters
);

export const selectComics = createSelector(
    selectComicFeature,
    ( state: ComicState ) => state.comics
);

export const selectStories = createSelector(
    selectStoryFeature,
    ( state: StoryState ) => state.stories
);