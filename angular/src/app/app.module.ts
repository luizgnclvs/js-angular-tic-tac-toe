import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TitleComponent } from './components/title/title.component';
import { TurnDisplayComponent } from './components/turn-display/turn-display.component';
import { ControlPanelComponent } from './components/control-panel/control-panel.component';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';
import { CustomizePanelComponent } from './components/customize-panel/customize-panel.component';
import { CellComponent } from './components/cell/cell.component';
import { BoardComponent } from './components/board/board.component';

@NgModule({
	declarations: [
		AppComponent,
		BoardComponent,
		CellComponent,
		ColorPickerComponent,
		ControlPanelComponent,
		CustomizePanelComponent,
		TitleComponent,
		TurnDisplayComponent
	],
	imports: [
		BrowserModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
