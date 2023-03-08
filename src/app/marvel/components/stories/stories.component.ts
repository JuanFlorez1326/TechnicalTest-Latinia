import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, map, switchMap } from 'rxjs';
import { ResultStory } from '../../interfaces/stories.interface';
import { MarvelService } from '../../services/marvel.service';
import { loadStoriesSuccess } from '../../state/actions/character.actions';
import { CharactersState } from '../../state/character.state';
import { ApiResponse } from '../../interfaces/api-response.interface';

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
  subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe< ApiResponse, ResultStory[] > (
      switchMap( ({ id }) => this.marvelService.getStoriesById( id )),
      map( ( res: any ) => res.data.results )
    )
    .subscribe(
      ( response: ResultStory[] ) => {
        this.stories = response;
        this.store.dispatch(loadStoriesSuccess({ stories: response }));
      }
    );
  }

  ngOnDestroy(): void {
    if(this.subscription) this.subscription.unsubscribe();
  }
}