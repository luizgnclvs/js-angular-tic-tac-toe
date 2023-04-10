export class Cell {
	row: number = 0;
	column: number = 0;
	firstDiagonal: boolean = false;
	secondDiagonal: boolean = false;
	mark: string = '';
	available: boolean = true;
	win: boolean = false;
}
