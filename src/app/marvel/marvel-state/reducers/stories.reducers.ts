import * as fromActions from '../actions/stories.actions';
import { StoriesActionTypes  } from '../actions/stories.actions';
import { ResultComic } from '../../interfaces/comics.interface';
import { ResultCharacter } from '../../interfaces/characters.interface';
import { ResultStory } from '../../interfaces/stories.interface';

export interface StoriesState {
    stories: ResultStory[] |  ResultCharacter[] | ResultComic[];
    error: string;
}

export const initialStoriesState: StoriesState = {
    stories: [],
    error: ''
};

export function storiesReducer(state = initialStoriesState, action: fromActions.StoriesActions): StoriesState {
    switch (action.type) {
        case StoriesActionTypes.LoadStoriesSuccess:
            return {
                ...state,
                stories: action.payload.stories
            };
        case StoriesActionTypes.LoadStoriesFailure:
            return {
                ...state,
                error: action.payload.error
            };
        default:
            return state;
    }
}

export const getStories = (state: StoriesState) => state.stories;
export const getError = (state: StoriesState) => state.error;