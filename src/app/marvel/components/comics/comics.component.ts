import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Comic, ResultComic } from '../../interfaces/comics.interface';
import { MarvelService } from '../../services/marvel.service';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.scss']
})
export class ComicsComponent implements OnInit {

  constructor(
    private readonly marvelService: MarvelService,
    private readonly activatedRoute: ActivatedRoute
  ) { }

  comics: ResultComic[] = [];
  formats: string[] = ['comic','digest', 'magazine', 'hardcover', 'graphic novel', 'digital comic', 'infinite comic', 'trade paperback'];
  formatActive: string = '';

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe<Comic> (
      switchMap( ({ id }) =>
        this.marvelService.getComicsByCharacterId( id )
      )
    )
    .subscribe(
      (res: Comic ) => {
        this.comics = res.data.results;
      }
    )
  }

  filterByFormat( format: string ) {
    if ( format === this.formatActive ) { return; }
    this.formatActive = format;
    this.comics = []

    this.activatedRoute.params
    .pipe<Comic> (
      switchMap( ({ id }) =>
        this.marvelService.getComicsByFormatAndCharacterId( id, format )
      )
    )
    .subscribe(
      (res: Comic ) => {
        this.comics = res.data.results;
      }
    )
  }
}