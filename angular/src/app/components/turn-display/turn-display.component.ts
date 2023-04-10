import { Component, Input } from '@angular/core';

import { Message } from 'src/app/models/message';

@Component({
	selector: 'app-turn-display',
	templateUrl: './turn-display.component.html',
	styleUrls: ['./turn-display.component.css']
})
export class TurnDisplayComponent {
	@Input() hidden: boolean = true;
	@Input() message!: Message;
}
