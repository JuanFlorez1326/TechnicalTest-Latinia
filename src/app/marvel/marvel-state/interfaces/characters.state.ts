import { ResultCharacter } from "../../interfaces/characters.interface";
import { ResultComic } from "../../interfaces/comics.interface";
import { ResultStory } from "../../interfaces/stories.interface";


export interface CharacterState {
    characters: Array<ResultCharacter>;
}

export interface ComicState {
    comics: Array<ResultComic>;
}

export interface StoryState {
    stories: Array<ResultStory>;
}