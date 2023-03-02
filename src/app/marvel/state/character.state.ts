import { ActionReducerMap } from "@ngrx/store";
import { CharacterState } from "../interfaces/characters.state";
import { characterReducer } from "./reducers/character.reducers";

export interface CharactersState {
    character: CharacterState;
}

export const CHARACTER_REDUCERS: ActionReducerMap<CharactersState> = {
    character: characterReducer
}