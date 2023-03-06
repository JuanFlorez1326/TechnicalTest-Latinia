import { ActionReducerMap } from "@ngrx/store";
import { CharacterState, ComicState } from "../interfaces/characters.state";
import { characterReducer, comicReducer } from "./reducers/character.reducers";

export interface CharactersState {
    character: CharacterState;
    comic: ComicState;
}

export const CHARACTER_REDUCERS: ActionReducerMap<CharactersState> = {
    character: characterReducer,
    comic: comicReducer
}