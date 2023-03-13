import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { Property } from 'src/app/models/property';

@Component({
	selector: 'app-customize-panel',
	templateUrl: './customize-panel.component.html',
	styleUrls: ['./customize-panel.component.css']
})
export class CustomizePanelComponent implements OnInit {
	readonly DEFAULT_BACKGROUND: string = '#292929';
	readonly DEFAULT_BOARD: string = '#969696';

	backgroundProperty!: Property;
	boardProperty!: Property;

	constructor (@Inject(DOCUMENT) private document: any) {}

	ngOnInit(): void {
		this.initProperties();
	}

	initProperties (): void {
		this.backgroundProperty = {
			name: 'bg-color',
			label: 'background',
			value: ''
		};
	
		this.boardProperty = {
			name: 'board-color',
			label: 'board',
			value: ''
		};
	}

	changePropertyColor (property: Property) {
		let root = this.document.querySelector(':root');

		root.style.setProperty(`--${property.name}`, property.value)
		localStorage.setItem(property.name, property.value);
	}

	resetColors (): void {
		let root = this.document.querySelector(':root');

		root.style.setProperty('--bg-color', this.DEFAULT_BACKGROUND);
		root.style.setProperty('--board-color', this.DEFAULT_BOARD);

		this.backgroundProperty.value = this.DEFAULT_BACKGROUND;
		this.boardProperty.value = this.DEFAULT_BOARD;

		localStorage.setItem('bg-color', this.DEFAULT_BACKGROUND);
		localStorage.setItem('board-color', this.DEFAULT_BOARD);
	}
}
