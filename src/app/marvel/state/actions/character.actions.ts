import { createAction, props } from '@ngrx/store';
import { ResultCharacter } from '../../interfaces/characters.interface';
import { ResultComic } from '../../interfaces/comics.interface';

export const loadCharactersSuccess = createAction(
    '[Character] Load Characters Success',
    props<{ characters: ResultCharacter[] }>()
);

export const loadComicsSuccess = createAction(
    '[Character] Load Comics Success',
    props<{ comics: ResultComic[] }>()
);