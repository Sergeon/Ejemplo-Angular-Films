import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FilmsListComponent } from './films-list/films-list.component';
import { FilmCardComponent } from './film-card/film-card.component';

@NgModule({
  declarations: [
    AppComponent,
    FilmsListComponent,
    FilmCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
