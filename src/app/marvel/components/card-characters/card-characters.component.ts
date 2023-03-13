import { Component, Input } from '@angular/core';
import { ResultCharacter } from '../../interfaces/characters.interface';

@Component({
  selector: 'app-search-results',
  templateUrl: './card-characters.component.html',
  styleUrls: ['./card-characters.component.scss']
})
export class CardCharactersComponent {
  @Input('card-characters') characters$!: ResultCharacter[];
}