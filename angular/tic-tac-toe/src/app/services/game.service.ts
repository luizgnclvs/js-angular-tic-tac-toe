import { Injectable } from '@angular/core';

import { Cell } from '../models/cell';
import { Message } from '../models/message';

@Injectable({
	providedIn: 'root'
})
export class GameService {
	cellList: Array<Cell> = [];
	message: Message = new Message();
	gameOnGoing: boolean = false;
	mark: string = 'close';

	constructor() {
		this.populateCells();
	}

	populateCells ():void {
		for (let i = 1; i <= 3; i++) {
			for (let j = 1; j <= 3; j++) {
				let cell = new Cell();

				cell.row = i;
				cell.column = j;

				if (i === j) cell.firstDiagonal = true;
				if (i + j === 4) cell.secondDiagonal = true;

				this.cellList.push(cell);
			}
		}
	}

	formatMessage (start: string, end: string, mark: string): void {
		this.message.start = start;
		this.message.end = end;
		this.message.mark = mark;
	}

	switchMark (): void {
		this.mark = this.mark === 'close' ? 'radio_button_unchecked' : 'close';
	}

	newGame (): void {
		this.gameOnGoing = true;

		this.cellList.forEach(cell => {
			cell.mark = '';
			cell.available = true;
			cell.win = false;
		});

		this.formatMessage('It\'s player', 'turn!', this.mark);
	}

	makeMove (cell: Cell): void {
		if (this.gameOnGoing && cell.available) {
			cell.mark = this.mark;
			cell.available = false;

			this.switchMark();
			this.message.mark = this.mark;

			setTimeout(() => {
				this.verifyBoardCompletion(cell);
			}, 100);
		}
	}

	verifyBoardCompletion (cell: Cell): void {
		let match = this.verifyIfLineMatches(cell.mark, 'row', cell.row);
		if (!match)
			match = this.verifyIfLineMatches(cell.mark, 'column', cell.column);
		if (!match && cell.firstDiagonal)
			match = this.verifyIfLineMatches(cell.mark, 'firstDiagonal', cell.firstDiagonal);
		if (!match && cell.secondDiagonal)
			match = this.verifyIfLineMatches(cell.mark, 'secondDiagonal', cell.secondDiagonal);

		if (!match && this.verifyIfBoardIsFilled()) this.handleDraw();
		if (match) this.handleWinner(cell.mark);
	}

	verifyIfBoardIsFilled (): boolean {
		let filled = true;

		this.cellList.forEach(cell => {
			if (cell.available) filled = false;
		});

			return filled;
	}

	verifyIfLineMatches (mark: string, section: string, filter: number | boolean): boolean {
		let match = true;

		let selectedCells = this.cellList.filter(cell => cell[section as keyof Cell] === filter);
		selectedCells.forEach(cell => {
			if (cell.mark !== mark) match = false;
		});

		if (match) selectedCells.forEach(cell => cell.win = true);

			return match;
	}

	handleDraw (): void {
		this.formatMessage('It\'s a draw! Try again', '', '');
		this.gameOnGoing = false;
	}

	handleWinner (mark: string): void {
		this.formatMessage('Player', 'has won! Want a rematch?', mark)
		this.gameOnGoing = false;
	}
}
