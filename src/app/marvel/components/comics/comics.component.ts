import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs';
import { Comic, ResultComic } from '../../interfaces/comics.interface';
import { MarvelService } from '../../services/marvel.service';
import { loadComicsSuccess } from '../../state/actions/character.actions';
import { CharactersState } from '../../state/character.state';

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
  formats: string[] = ['comic','digest', 'magazine', 'hardcover', 'graphic novel', 'digital comic', 'infinite comic', 'trade paperback'];
  formatActive!: string;

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe< Comic, ResultComic[] > (
      switchMap( ({ id }) => this.marvelService.getComicsByCharacterId( id )),
      map( ( res: Comic ) => res.data.results )
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
    .pipe< Comic, ResultComic[] > (
      switchMap( ({ id }) => this.marvelService.getComicsByFormatAndCharacterId( id, format )),
      map( ( res: Comic ) => res.data.results )
    )
    .subscribe(
      ( response: ResultComic[] ) => {
        this.comics = response;
        this.store.dispatch(loadComicsSuccess({ comics: response })); 
      }
    );
  }
}