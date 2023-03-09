import { Component } from '@angular/core';
import { MarvelService } from '../../services/marvel.service';
import { ActivatedRoute } from '@angular/router';
import { CharactersState } from '../../state/character.state';
import { Store } from '@ngrx/store';
import { ResultComic } from '../../interfaces/comics.interface';
import { Subscription, map, switchMap } from 'rxjs';
import { ApiResponse } from '../../interfaces/api-response.interface';
import { loadCharactersSuccess, loadComicsSuccess, loadStoriesSuccess } from '../../state/actions/character.actions';
import { Formats } from '../../components/comics/formats-comics';
import { ResultStory } from '../../interfaces/stories.interface';
import { ResultCharacter } from '../../interfaces/characters.interface';

@Component({
  selector: 'app-detailed',
  templateUrl: './detailed.component.html'
})
export class DetailedComponent {
  constructor(
    private readonly marvelService: MarvelService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly store: Store<CharactersState>
  ) { }

  comics: ResultComic[] = [];
  stories: ResultStory[] = [];
  character: ResultCharacter[] = [];
  formats: string[] = Object.values(Formats);
  formatActive!: string;
  subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.getComics();
    this.getStories();
    this.seeCharacter();
  }

  getComics(): void {
    this.subscription.add( 
      this.activatedRoute.params
      .pipe< ApiResponse, ResultComic[] > (
        switchMap( ({ id }) => this.marvelService.getComicsById( id )),
        map( ( res: any ) => res.data.results )
      )
      .subscribe(
        ( response: ResultComic[] ) => {
          this.comics = response;
          this.store.dispatch(loadComicsSuccess({ comics: response }));
        }
      )
    );
  }

  filterByFormat( format: string ): void {
    if ( format === this.formatActive ) { return; }
    this.formatActive = format;
    
    this.subscription.add( 
      this.activatedRoute.params
      .pipe< ApiResponse, ResultComic[] > (
        switchMap( ({ id }) => this.marvelService.getComicsById( id, { format } )),
        map( ( res: any ) => res.data.results )
      )
      .subscribe(
        ( response: ResultComic[] ) => {
          this.comics = response;
          this.store.dispatch(loadComicsSuccess({ comics: response })); 
        }
      )
    );
  }

  getStories(): void {
    this.subscription.add( 
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
      )
    );
  }

  seeCharacter() {
    this.subscription.add( 
      this.activatedRoute.params
      .pipe (
        switchMap( ({ id }) => this.marvelService.getCharacter(id) ),
        map( ( res: any ) => res.data.results )
      )
      .subscribe(
        ( response: ResultCharacter[] ) => {
          this.character = response;
          this.store.dispatch(loadCharactersSuccess({ characters: response }));
        }
      )
    );
  }

  ngOnDestroy(): void {
    if(this.subscription) this.subscription.unsubscribe();
  }
}