# Aplicación Angular de prueba: Films

## Rama pipes

### Pasos a seguir para realizar el ejercicio

Partimos del estado de la aplicación en la rama 'tarjetas', en la que hemos extraído el detalle de las películas al componente `film-card`.

Ahora queremos formatear la salida de los protagonistas o los directores para que, en vez de mostrar un listado como:

'Keanu Reeves,Laurence Fishburne,Carrie-Anne Moss'

Muestre un listado con un espacio detrás de cada coma:

'Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss.

En javascript, y por tanto en typescript, para separar elementos de un array como una cadena de texto con un separador dado, podemos utilizar simplemente el método `join`:

```javascript
this.film.stars = this.film.stars.join(', ');
```

Ejecutar esa línea en el componente resolvería nuestro problema. Pero tendríamos que realizar el mismo trabajo para los listados de directores. Además, si tuviéramos otros componentes con listas que queremos mostrar en la aplicación, tendríamos que volver a rehacer el trabajo. Para evitar esto, podemos crear un pipe y utilizarlo para formatear la salida en los `.html`.

Bien, lo primero que vamos a hacer es crear nuestro pipe con `angular-cli`:

`npm run ng -- g pipe list`

Ahora, bajo `src/app/`, tenemos dos nuevos ficheros:

 - `list.pipe.ts`
 - `list.pipe.spec.ts`

 El segundo es un fichero de testing que podemos ignorar por ahora. En cuanto al primero, tiene el código *boilerplate* a partir del cual desarrollaremos nuestro pipe:

 ```ts
 import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'list'
})
export class ListPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}

 ```

 Aquí lo importante es que nuestro objeto define una función `transform` que toma por parámetro el valor que queremos formatear y devuelve el valor formateado. Además, en los metadatos de la clase, definidos en el decorador `@Pipe`, fijamos un campo `name`. Éste es el que determina como vamos a usar el pipe en el html. En este caso, dado que el `name` es 'list', usaríamos ese nombre. Por ejemplo:

 ```html
  <p>Protagonistas: {{ film.stars || list }}</p>
 ```

 Además, en la función `transform` tenemos un segundo parámetro, `args`, que indica los parámetros que pasamos al pipe. Para pasar parámetros al pipe se utilizan dos puntos:

  ```html
  <p>Protagonistas: {{ film.stars || list:23 }}</p>
 ```

 (*Recuerda que, en tipescript, el carácter `?` detrás de un parámetro implica que el parámetro que estamos pasando es opcional.*)

 En este caso, estaríamos pasando `23` a nuestro pipe como parámetro `args`.

 Una vez que entedemos esto, tenemos que modificar nuestra función `transform` para que tome un array por parámetro y devuelva un string con el array formateado.

 Lo primero que vamos a hacer es modificar los tipos de la función:

 ```typescript
 transform(value: Array<string>, args?: any): string {
    return null;
  }
 ```

 Nuestro pipe formatea arrays de strings y devuelve un string.

 Ahora, vamos a implementarlo para formatear la lista utilizando el método `join`:

 ```typescript
 transform(value: Array<string>, args?: any): string {
    return value.join(', ');
  }
 ```

 Una vez hecho esto, modificamos el html de la `film-card`:

 `src/app/film-card.component.html`:

 ```html
 <div class="film">
  <h1>{{film.name}}</h1>
  <p>directores: {{film.directors | list }}</p>
  <p>protagonistas: {{film.stars | list }}</p>
  <p>Puntuación: {{film.rate}}</p>

  <img [src]="film.frontImg">

</div>
 ```

 De tal modo que formateamos la lista de directores y protagonistas.


 Ahora bien, es un poco triste no definir ningún pipe que tome parámetros. Para arreglarlo, y de paso mejorar un poco nuestra aplicación, vamos a crear dos nuevos pipes:

 Uno, `main`, simplemente devolverá el primer elemento del array, mientras que el segundo, `supportives`, nos devolverá la lista de actores secundarios.

 Igual que hemos hecho antes, creamos los nuevos pipes con `angular-cli`:

 `npm run ng -- g pipe main`
 `npm run ng -- g pipe supportives`

 El primer pipe, `main`, debe simplemente devolver el primer elemento del array:

 ```typescript
 import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'main'
})
export class MainPipe implements PipeTransform {

  transform(value: Array<string>, args?: any): string {
    return value[0];
  }

}
 ```

 Nuestro otro pipe `supportives`, tiene que devolver una lista con los elemenos del array menos el primero. Podríamos definir su método transform así:

 ```typescript
 transform(value: Array<string>, args?: any): string {
    return value.slice(1).join(', ');
  }
 ```
Pero esto siempre eliminará un solo elemento al principio del array. ya que tenemos disponible la variable `args`, podemos modificar el código un poco para permitir que el cliente del pipe pueda elegir cuantos elementos quiere eliminar al principio del array. Para ello, modificamos la función `transform`, de tal modo que quede como sigue:

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'supportives'
})
export class SupportivesPipe implements PipeTransform {

  transform(value: Array<string>, args?: any): string {

    if (args) {
      return value.slice(args).join(', ');
    }
    return value.slice(1).join(', ');
  }
}
```

Ahora, el cliente puede, si así lo desea, elegir el número de elementos que quiere cortar. Por ejemplo este uso en el html: 

`src/app/film-card.component.html`:

```html
  <div class="film">
  <h1>{{film.name}}</h1>
  <p>directores: {{film.directors | list }}</p>
  <p>protagonista: {{film.stars | main }}</p>
  <p>protagonistas: {{film.stars | supportives:2 }}</p>
  <p>Puntuación: {{film.rate}}</p>

  <img [src]="film.frontImg">

</div>
```

Nos dejaría solamente a Carrie Ann Moss como secundaria de 'Matrix'. Como realmente no queremos eso, dejamos nuestro código así:

```html
  <div class="film">
  <h1>{{film.name}}</h1>
  <p>directores: {{film.directors | list }}</p>
  <p>protagonista: {{film.stars | main }}</p>
  <p>protagonistas: {{film.stars | supportives:1 }}</p>
  <p>Puntuación: {{film.rate}}</p>

  <img [src]="film.frontImg">

</div>
```

Con esto, vemos cómo de fácil es definir nuestros propios pipes y usarlos para formatear html :-D






