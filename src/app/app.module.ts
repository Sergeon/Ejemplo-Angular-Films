import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FilmCardComponent } from './film-card/film-card.component';
import { FilmsListComponent } from './films-list/films-list.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ListPipe } from './list.pipe';
import { MainPipe } from './main.pipe';
import { NgModule } from '@angular/core';
import { SupportivesPipe } from './supportives.pipe';


@NgModule({
  declarations: [
    AppComponent,
    FilmsListComponent,
    FilmCardComponent,
    ListPipe,
    MainPipe,
    SupportivesPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  exports: [ListPipe],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
