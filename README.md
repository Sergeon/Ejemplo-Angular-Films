# Aplicación Angular de prueba: Films

## Rama Tarjetas

### Pasos a seguir para realizar el ejercicio

Partimos de la aplicación en la rama `listado`: tenemos un componente `films-list` que itera sobre cada película, fijada en el componente con la variable `films`, y muestra la información de cada una de ellas.

Ahora lo que queremos es crear un segundo componente, que vamos a denominar `film-card`, que simplemente se preocupe de generar una tarjeta de película. Cuando `films-list` itere sobre los films, lo único que tendrá que hacer es crear un `film-card`, utilizando el tag `<app-film-card>`, y pasarle la información de cada película.

#### card component

Lo primero es crear un componente `film-card`. Por ahora, vamos a elegir que sea `app.module` quien declare nuestros componentes, así que simplemente haremos en el terminal:

`npm run ng -- g component film-card` y `angular-cli` crear los ficheros correspondientes a este componente, bajo `app/`, y modificará `app.module` para que declare nuestro nuevo componente.

Si hubiéramos querido generar `film-card` bajo `films-list`, podríamos haber hecho en cambio:
`npm run ng -- g component films-list/film-card`. En función de los requerimientos de nuestro proyecto optaríamos por una opción u otra.

Una vez que hemos introducido el comando, tenemos una nueva carpeta `src/app/film-card`. Ahora, en el html de `films-list` vamos a crear un `film-card` por cada película:

`src/app/films-list.component.html`:

```html
<div class="films-wrapper">
  <app-film-card *ngFor="let film of films"></app-film-card>
</div>
```

Ahora, nuestra aplicación lo único que hace es mostrar la frase 'film-card works!' por cada película.
Lo que debemos hacer ahora es mostrar la información de cada film en el html de `film-card`:

`src/app/film-card.component.html`:

```html
<div class="film">
  <h1>{{film.name}}</h1>
  <p>directores: {{film.directors}}</p>
  <p>protagonistas: {{film.stars}}</p>
  <p>Puntuación: {{film.rate}}</p>

  <img [src]="film.frontImg">

</div>
```

Cuando hagamos esto, veremos que el visual studio code se queja de que no existe la variable `film`, y la aplicación dejará de funcionar. Tenemos que indicarle al componente cuál es el film que tiene que pintar.

Para ello, tenemos que conseguir que `films-list`, que en este punto es quien conoce la lista de películas, se lo pueda pasar, digamos, *por parámetro*, solo que no será como parámetro de una función sino como atributo html.

Para ello, tendremos que modificar dos ficheros. Por un lado, el componente `film-card` necesita una variable `film`, y por otro lado, `films-list` tiene que pasarle el film a la tarjeta en el html:

`src/app/film-card.component.ts`:

```typescript
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.css']
})
export class FilmCardComponent implements OnInit {

  @Input() film: any;
  constructor() { }

  ngOnInit() {
  }

}
```

Como vemos, no solo debemos crear una variable `film`, sino que tenemos que configurarla de tal manera que Angular entienda que otro componente se la va a pasar como un atributo. Para ello, utilizamos el decorador `@Input()`.

Una vez que tenemos esto configurado, debemos modificar el html de `films-list` para que le pase el film al componente:

`src/app/films-list.component.html`:

```html
<div class="films-wrapper">
  <app-film-card *ngFor="let film of films"  [film]="film"></app-film-card>
</div>
```

Al añadir la parte `[film]="film"` estamos indicando que la variable `film` del componente card es igual al `film` que en cada caso esté referenciando el `ngFor`.

Llegados a este punto, tenemos nuestro componente `film-card` funcionando correctamente, pero ha perdido los estilos porque los teníamos en el componente `films-list`, que no puede afectar al componente `film-card` por el tema del 'shadow css'.

Entonces simplemente movemos los estilos al nuevo componente:

`src/app/film-card.component.css`:

```css
.film{
    margin: 100px;
    padding: 30px;
    text-align: center;
    background-color : lightseagreen;
    color : white;
    border-radius: 7px;
}

.film p{
    font-size : 16px;
}

.film img{
    width: 120px;
    margin: auto;
    display: block;
}
```
