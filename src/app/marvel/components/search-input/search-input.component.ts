import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, map } from 'rxjs';
import { Store } from '@ngrx/store';

import { MarvelService } from '../../services/marvel.service';
import { ResultCharacter } from '../../interfaces/characters.interface';
import { loadCharactersSuccess } from '../../state/actions/character.actions';
import { CharactersState } from '../../state/character.state';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { selectCharacters } from '../../state/selectors/character.selectors';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit  {

  constructor(
    private readonly marvelService: MarvelService,
    private readonly store: Store<CharactersState>,
    private readonly formBuilder: FormBuilder
  ) {
    this.buildForm();
    this.searchForm.valueChanges.subscribe( form => {
      this.nameStartsWith = form.nameStartsWith;
      this.limit = form.limit;
    });
  }

  characters: ResultCharacter[] = [];
  searchForm!: FormGroup;
  limit!: number;
  nameStartsWith!: string;
  showTable: boolean = true;
  subscription: Subscription = new Subscription();
  alphanumericRegex: RegExp = /^[a-zA-Z0-9- .()]*$/;
  characters$: Observable<any> = new Observable();

  ngOnInit(): void {
    
    this.characters$ = this.store.select(selectCharacters);

    this.marvelService.getAllCharacters()
    .pipe< ResultCharacter[] > ( map( (res: any ) => res.data.results ) )
    .subscribe(
      ( characters: ResultCharacter[] ) => {
        this.store.dispatch(loadCharactersSuccess({ characters: characters }));
      }
    );
  }

  private buildForm(): void {
    this.searchForm = this.formBuilder.group({
      nameStartsWith: ['', [
        Validators.required,
        Validators.pattern(this.alphanumericRegex)
      ]],
      limit: [1, [
          Validators.required, 
          Validators.min(1), 
          Validators.max(10)
        ]
      ]
    });
  }

  saveForm(): void {  
    if (this.searchForm.valid) {
      const { nameStartsWith, limit } = this.searchForm.value;
      this.nameStartsWith = nameStartsWith;
      this.limit = limit;
      this.searchCharacters();
    }
  }

  searchCharacters(): void {
    this.marvelService.searchCharacter(this.nameStartsWith, this.limit)
    .pipe< ResultCharacter[] > ( map( (res: any ) => res.data.results ) )
    .subscribe(
      ( characters: ResultCharacter[] ) => {
        this.store.dispatch(loadCharactersSuccess({ characters: characters }));
      }
    );
  }

  showTableCharacters(): void {
    this.showTable ? this.showTable = false : this.showTable = true;
  }

  ngOnDestroy(): void {
    if(this.subscription) this.subscription.unsubscribe();
  }
}