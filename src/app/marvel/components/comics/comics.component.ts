import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, map, switchMap } from 'rxjs';
import { ResultComic } from '../../interfaces/comics.interface';
import { MarvelService } from '../../services/marvel.service';
import { loadComicsSuccess } from '../../state/actions/character.actions';
import { CharactersState } from '../../state/character.state';
import { Formats } from './formats-comics';
import { ApiResponse } from '../../interfaces/api-response.interface';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.scss']
})
export class ComicsComponent implements OnInit {

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