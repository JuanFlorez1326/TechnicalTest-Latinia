import { Action, createAction, props } from '@ngrx/store';
import { ResultCharacter } from '../../interfaces/characters.interface';
import { ResultComic } from '../../interfaces/comics.interface';
import { ResultStory } from '../../interfaces/stories.interface';

export enum CharacterActionTypes {
    LoadCharacters = '[Character] Load Characters',
    LoadComics = '[Character] Load Comics',
    LoadStories = '[Character] Load Stories',
}

// export class loadCharactersSuccess implements Action {
//     readonly type = CharacterActionTypes.LoadCharacters;
//     constructor( public payload: { characters: ResultCharacter[] } ) {}
// }

// export class loadComicsSuccess implements Action {
//     readonly type = CharacterActionTypes.LoadComics;
//     constructor( public payload: { comics: ResultComic[] } ) {}
// }

// export class loadStoriesSuccess implements Action {
//     readonly type = CharacterActionTypes.LoadStories;
//     constructor( public payload: { stories: ResultStory[] } ) {}
// }





export const loadCharactersSuccess = createAction(
    '[Character] Load Characters Success',
    props<{ characters: ResultCharacter[] }>()
);

export const loadComicsSuccess = createAction(
    '[Character] Load Comics Success',
    props<{ comics: ResultComic[] }>()
);

export const loadStoriesSuccess = createAction(
    '[Character] Load Stories Success',
    props<{ stories: ResultStory[] }>()
);