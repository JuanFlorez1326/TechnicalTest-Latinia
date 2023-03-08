import { Component, Input} from '@angular/core';
import { ResultStory } from '../../interfaces/stories.interface';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})
export class StoriesComponent {
  @Input() stories!: ResultStory[];
}