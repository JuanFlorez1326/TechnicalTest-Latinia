import { createAction, props } from '@ngrx/store';
import { ResultCharacter } from '../../interfaces/characters.interface';

export const loadCharacters = createAction(
    '[Character] Load Characters'
);

export const loadCharactersSuccess = createAction(
    '[Character] Load Characters Success',
    props<{ characters: ResultCharacter[] }>()
);