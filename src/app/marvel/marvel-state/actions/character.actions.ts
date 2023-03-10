import { createAction, props } from '@ngrx/store';
import { ResultCharacter } from '../../interfaces/characters.interface';
import { ResultComic } from '../../interfaces/comics.interface';
import { ResultStory } from '../../interfaces/stories.interface';

export const loadCharactersSuccess = createAction(
    '[Character] Load Characters Success',
    props<{ characters: ResultCharacter[] }>()
);

export const loadComicsSuccess = createAction(
    '[Comics] Load Comics Success',
    props<{ comics: ResultComic[] }>()
);

export const loadStoriesSuccess = createAction(
    '[Stories] Load Stories Success',
    props<{ stories: ResultStory[] }>()
);