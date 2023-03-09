import { createReducer, on } from '@ngrx/store';
import { CharacterState, ComicState, StoryState } from '../interfaces/characters.state';
import { loadCharactersSuccess, loadComicsSuccess, loadStoriesSuccess } from '../actions/character.actions';

export const initialCharacterState: CharacterState = { characters: [] };
export const initialComicState: ComicState = { comics: [] };
export const initialStoryState: StoryState = { stories: [] };

export const characterReducer = createReducer(
    initialCharacterState,
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

export const storyReducer = createReducer(
    initialStoryState,
    on( loadStoriesSuccess, ( state, { stories } ) => {
        return { ...state, characters: [ ...stories ] };
    })
);