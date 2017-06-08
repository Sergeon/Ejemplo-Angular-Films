# Aplicación Angular de prueba: Films

## Rama Listado

### Pasos a seguir para realizar la aplicación

Lo primero es crear un componente `films-list`, y para ello vamos a tener que necesitar declararlo en un módulo.

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

Debemos ver en el navegador el mensaje: 'films-list works!'  
