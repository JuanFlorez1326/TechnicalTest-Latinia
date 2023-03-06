import { ActionReducerMap } from "@ngrx/store";
import { CharacterState, ComicState, StoryState } from "../interfaces/characters.state";
import { characterReducer, comicReducer, storyReducer } from "./reducers/character.reducers";

export interface CharactersState {
    character: CharacterState;
    comic: ComicState;
    story: StoryState;
}

export const CHARACTER_REDUCERS: ActionReducerMap<CharactersState> = {
    character: characterReducer,
    comic: comicReducer,
    story: storyReducer
}