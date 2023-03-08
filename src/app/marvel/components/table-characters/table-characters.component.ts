import { Component, Input } from '@angular/core';
import { ResultCharacter } from '../../interfaces/characters.interface';
import { CdkTableDataSourceInput } from '@angular/cdk/table';

@Component({
  selector: 'app-table-characters',
  templateUrl: './table-characters.component.html',
  styles: [`.container-table { width:95%; margin:auto; }`]
})
export class TableCharactersComponent {
  
  @Input('table-characters') characters$!: CdkTableDataSourceInput<ResultCharacter>;
  displayedColumns: string[] = ['position', 'id', 'date', 'name', 'seemore'];
}