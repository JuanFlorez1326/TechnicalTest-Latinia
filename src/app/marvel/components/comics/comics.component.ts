import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ResultComic } from '../../interfaces/comics.interface';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.scss']
})
export class ComicsComponent {
  @Input() formats!: string[];
  @Input() comics!: ResultComic[];
  @Output() filterByFormat: EventEmitter<string> = new EventEmitter<string>();

  emitFormat( format: string ): void { this.filterByFormat.emit( format ) }
}