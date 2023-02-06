import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { ResultStory, Stories } from '../../interfaces/stories.interface';
import { MarvelService } from '../../services/marvel.service';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styles: [` .title { font-weight: bold; } `]
})
export class StoriesComponent implements OnInit {
  
  constructor(
    private readonly marvelService: MarvelService,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  stories: ResultStory[] = [];

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe<Stories> (
      switchMap( ({ id }) =>
        this.marvelService.getStoriesByCharacterId( id )
      )
    )
    .subscribe(
      (res: Stories ) => {
        this.stories = res.data.results;
      }
    )
  }
}