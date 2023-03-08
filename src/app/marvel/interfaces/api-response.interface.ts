import { ResultCharacter } from "./characters.interface";
import { ResultComic } from './comics.interface';
import { ResultStory } from "./stories.interface";

export interface ApiResponse {
    code:            number;
    status:          string;
    copyright:       string;
    attributionText: string;
    attributionHTML: string;
    etag:            string;
    data: {
        offset:      number;
        limit:       number;
        total:       number;
        count:       number;
        results: ResultCharacter[] | ResultComic[] | ResultStory[];
    }
}