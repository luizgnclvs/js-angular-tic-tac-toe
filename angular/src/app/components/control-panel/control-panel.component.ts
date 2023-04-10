import { Component } from '@angular/core';

import { GameService } from 'src/app/services/game.service';

@Component({
	selector: 'app-control-panel',
	templateUrl: './control-panel.component.html',
	styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent {
	hideTurnDisplay: boolean = true;
	hideButton: boolean = false;
	buttonText: string = 'new game';

	constructor (public service: GameService) {}

	startNewGame (): void {
		this.hideTurnDisplay = false;
		this.buttonText = 'restart';
		this.service.newGame();
	}
}
