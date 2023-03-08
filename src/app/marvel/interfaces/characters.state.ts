import { ResultCharacter } from "./characters.interface";
import { ResultComic } from "./comics.interface";
import { ResultStory } from "./stories.interface";

export interface CharacterState {
    characters: Array<ResultCharacter>;
}

export interface ComicState {
    comics: Array<ResultComic>;
}

export interface StoryState {
    stories: Array<ResultStory>;
}