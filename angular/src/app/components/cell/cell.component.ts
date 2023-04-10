import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Cell } from 'src/app/models/cell';

@Component({
	selector: 'app-cell',
	templateUrl: './cell.component.html',
	styleUrls: ['./cell.component.css']
})
export class CellComponent {
	@Input() cell!: Cell;
	@Input() gameOnGoing!: boolean;

	@Output() play = new EventEmitter<Cell>();

	handleClick (): void {
		this.play.emit(this.cell);
	}
}
