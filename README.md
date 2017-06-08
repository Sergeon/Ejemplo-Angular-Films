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

