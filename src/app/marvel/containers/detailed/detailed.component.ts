import { Component } from '@angular/core';
import { MarvelService } from '../../services/marvel.service';
import { ActivatedRoute } from '@angular/router';
import { CharactersState } from '../../state/character.state';
import { Store } from '@ngrx/store';
import { ResultComic } from '../../interfaces/comics.interface';
import { Subscription, map, switchMap } from 'rxjs';
import { ApiResponse } from '../../interfaces/api-response.interface';
import { loadComicsSuccess } from '../../state/actions/character.actions';
import { Formats } from '../../components/comics/formats-comics';

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
  formats: string[] = Object.values(Formats);
  formatActive!: string;
  subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.getComics();
  }

  getComics(): void {
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
    );
  }

  filterByFormat( format: string ): void {
    if ( format === this.formatActive ) { return; }
    this.formatActive = format;

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
    );
  }

  ngOnDestroy(): void {
    if(this.subscription) this.subscription.unsubscribe();
  }
}