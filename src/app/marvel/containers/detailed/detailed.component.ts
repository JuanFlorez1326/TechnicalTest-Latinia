import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { Subscription, map, switchMap } from 'rxjs';

import { ApiResponse } from '../../interfaces/api-response.interface';
import { Formats } from '../../components/comics/formats-comics';
import { MarvelService } from '../../services/marvel.service';
import { ResultComic } from '../../interfaces/comics.interface';
import { ResultCharacter } from '../../interfaces/characters.interface';
import { ResultStory } from '../../interfaces/stories.interface';

@Component({
  selector: 'app-detailed',
  templateUrl: './detailed.component.html'
})
export class DetailedComponent {
  constructor(
    private readonly marvelService: MarvelService,
    private readonly activatedRoute: ActivatedRoute,
  ) { }

  comics: ResultComic[] = [];
  stories: ResultStory[] = [];
  characters$: ResultCharacter[] = [];
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
          this.characters$ = response;
        }
      )
    );
  }

  ngOnDestroy(): void {
    if(this.subscription) this.subscription.unsubscribe();
  }
}