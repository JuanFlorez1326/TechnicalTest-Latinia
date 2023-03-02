import { ResultCharacter } from "./characters.interface";

export interface CharacterState {
    loading: boolean;
    characters: ReadonlyArray<ResultCharacter>;
}