import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TitleComponent } from './components/title/title.component';
import { TurnDisplayComponent } from './components/turn-display/turn-display.component';
import { ControlPanelComponent } from './components/control-panel/control-panel.component';

@NgModule({
	declarations: [
		AppComponent,
		TitleComponent,
  TurnDisplayComponent,
  ControlPanelComponent
	],
	imports: [
		BrowserModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
