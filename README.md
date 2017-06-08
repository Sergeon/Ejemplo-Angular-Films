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
    <p>nombre: {{film.name}}</p>
    <p>directores: {{film.directors}}</p>
    <p>protagonistas: {{film.stars}}</p>

    <img [src]="film.frontImg">

  </div>

</div>
```

Algunas cosas importantes a notar son las siguientes:
 - Para poder acceder a la variable `film` en un atributo html, debemos especificar el atributo entre `[]`, como en el caso de **src** en la imagen.
 - Cuando declaramos `*ngFor`, debemos recordar usar **of** en vez de **in**: de lo contrario obtendremos un mensaje de error que no es muy claro y no nos ayuda mucho a depurar el problema.
    
