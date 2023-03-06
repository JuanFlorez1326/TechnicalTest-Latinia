import { ResultCharacter } from "./characters.interface";
import { ResultComic } from "./comics.interface";

export interface CharacterState {
    characters: ReadonlyArray<ResultCharacter>;
}

export interface ComicState {
    comics: ReadonlyArray<ResultComic>;
}