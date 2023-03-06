import { ResultCharacter } from "./characters.interface";
import { ResultComic } from "./comics.interface";
import { ResultStory } from "./stories.interface";

export interface CharacterState {
    characters: ReadonlyArray<ResultCharacter>;
}

export interface ComicState {
    comics: ReadonlyArray<ResultComic>;
}

export interface StoryState {
    stories: ReadonlyArray<ResultStory>;
}