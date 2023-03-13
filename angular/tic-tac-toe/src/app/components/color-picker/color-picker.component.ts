import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Property } from 'src/app/models/property';

@Component({
	selector: 'app-color-picker',
	templateUrl: './color-picker.component.html',
	styleUrls: ['./color-picker.component.css']
})
export class ColorPickerComponent implements OnInit {
	@Input() property!: Property;
	@Input() defaultValue!: string;

	@Output() colorChange = new EventEmitter<Property>();

	ngOnInit (): void {
		this.property.value = localStorage.getItem(this.property.name) ?? this.defaultValue;
		this.colorChange.emit(this.property);
	}

	handleInput (event: any): void {
		this.property.value = event.target.value;
		this.colorChange.emit(this.property);
	}
}
