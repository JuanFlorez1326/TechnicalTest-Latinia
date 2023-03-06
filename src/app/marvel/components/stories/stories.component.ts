import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs';
import { ResultStory, Stories } from '../../interfaces/stories.interface';
import { MarvelService } from '../../services/marvel.service';
import { loadStoriesSuccess } from '../../state/actions/character.actions';
import { CharactersState } from '../../state/character.state';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})
export class StoriesComponent implements OnInit {
  
  constructor(
    private readonly marvelService: MarvelService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly store: Store<CharactersState>
  ) {}

  stories: ResultStory[] = [];

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe< Stories, ResultStory[] > (
      switchMap( ({ id }) => this.marvelService.getStoriesById( id )),
      map( ( res: Stories ) => res.data.results )
    )
    .subscribe(
      ( response: ResultStory[] ) => {
        this.stories = response;
        this.store.dispatch(loadStoriesSuccess({ stories: response }));
      }
    );
  }
}