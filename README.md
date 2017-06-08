# Aplicación Angular de prueba: Films

## Rama Listado

### Pasos a seguir para realizar el ejercicio

Lo primero es crear un componente `films-list`, y para ello vamos a tener que declararlo en un módulo.

En este caso, por simplicidad, crearemos *directamente el componente*, esto provocará que `angular-cli`modifica el módulo `app.module.ts` para que sea él quien declare el componente `films-list`.

Esto sería una *mala práctica* en proyectos grandes: lo ideal es que cada dominio de nuestra aplicación tenga su propio módulo. No obstante, para demostrar que hay varias formas de hacerlo y comprobar las implicaciones que tiene a nivel de módulos, lo haremos así. Más adelante, en el siguiente ejercicio, el listado de usuarios de Github, declararemos un módulo específico para el listado.

Bien, para crear el componente ejecutaremos:

`npm run ng -- g component films-list`

Una vez hecho esto, modificamos `app.component.html` para que contenga únicamente el tag del componente `films-list`:

```html
<app-films-list></app-films-list>
```

Al hacerlo así, al levantar la aplicación con el comando:

`npm start`

Debemos ver en el navegador el mensaje: 'films-list works!'.

Lo siguiente es añadir el fichero con la información de las películas que vamos a mostrar. Lo crearemos como `films.service.ts` en el folder `app`. Nota que, aunque lo denominemos `service`, en este punto no es exactamente un servicio porque no lo estamos integrando con el motor de inyección de dependencias.

Una vez que tenemos el servicio, modificamos el componente `src/app/films.component.ts` para que importe el servicio y lo muestre como un `json`:

`films-list.component.ts`:

```typescript
import { Component, OnInit } from '@angular/core';
import { films } from './../films.service';

@Component({
  selector: 'app-films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.css']
})
export class FilmsListComponent implements OnInit {


  films: any;
  constructor() { }

  ngOnInit() {
    this.films = films;
  }

}
```

`films-list.component.html`:

```html
<p>
  {{ films | json }}
</p>
```

Al fijar `this.films = films` permitimos que el html del componente pueda acceder a la variable `films`.

Una vez hecho esto, lo que queremos es mostrar la información de cada película en `films-list.component.html`. Para ello, utilizaremos la directiva `ngFor` de Angular para generar un trozo de html para cada película:

`films-list.component.html`:

```html
<div class="films-wrapper">
  <div class="film" *ngFor="let film of films">
    <h1>{{film.name}}</h1>
    <p>directores: {{film.directors}}</p>
    <p>protagonistas: {{film.stars}}</p>
    <p>Puntuación: {{film.rate}}</p>

    <img [src]="film.frontImg">

  </div>

</div>

```

Algunas cosas importantes a notar son las siguientes:
 - Para poder acceder a la variable `film` en un atributo html, debemos especificar el atributo entre `[]`, como en el caso de **src** en la imagen.
 - Cuando declaramos `*ngFor`, debemos recordar usar **of** en vez de **in**: de lo contrario obtendremos un mensaje de error que no es muy claro y no nos ayuda mucho a depurar el problema.


 Una vez que estamos mostrando la lista de películas, vamos a darle un poco de estilo. Para ello, tenemos dos opciones, utilizar el `.css` del componente, el fichero `src/app/films-list.component.css`, o utilizar el fichero de estilos general, `styles.css`. 

 La diferencia fundamental es que el `.css` del componente tiene *shadow css*. Los estilos que definamos en ese fichero no van a aplicarse a lo que quede fuera del componente, tanto por arriba como por abajo -es decir, no va a afectar a componentes hijos-.

 Por otro lado, siempre hay que tener presente que `styles.css` se carga como estilo global de toda la aplicación porque está así definido en el fichero `.angular-cli.json`, en el campo `styles`. Podríamos añadir más hojas de estilo, cambiar el nombre de nuestra hoja de estilo global o incluso usar sass en vez de css sin problema.

 En este ejemplo, añadiremos los estilos al propio componente:

 `src/app/films-list.component.css`:

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

 ¡Bien! En este punto ya tenemos nuestro listado de películas correctamente formateado y renderizado.

 El siguiente paso es tener un componente específico que se preocupe únicamente de renderizar cada película, y separar así la responsabilidad de iterar sobre cada película, que será del componente `films-list`, y la de mostrar el detalle de cada película, que será responsabilidad de `film-card`. Para ver este desarrollo, comprueba la rama `tarjetas` del repositorio.


