import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Cell } from 'src/app/common/interfaces';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent{

  @Input() cell: Cell
  @Output() cellPress = new EventEmitter<Cell>()

  press(){
    this.cellPress.emit({ key: this.cell.key})
  }

}
