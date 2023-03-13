import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizePanelComponent } from './customize-panel.component';

describe('CustomizePanelComponent', () => {
	let component: CustomizePanelComponent;
	let fixture: ComponentFixture<CustomizePanelComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ CustomizePanelComponent ]
		})
		.compileComponents();

		fixture = TestBed.createComponent(CustomizePanelComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
