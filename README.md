
# HELPDESK PROJECT

> Status: Finished V.1

 ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) 
 ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) 
 ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) 
 ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) 
 ![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white) 
 ![Bootstrap](https://img.shields.io/badge/-boostrap-0D1117?style=for-the-badge&logo=bootstrap&labelColor=0D1117) 
 ![Vscode](https://img.shields.io/badge/Vscode-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white) 
 ![Git](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white) 


## Objective
The main objective of this project is the development an Frontend to consume an API called HelpDesk, that was found in the Github hepo oliveira-jo. 
Secondly is to apply all knowloag I got throw the years.   


## Project Base 
+ SERVICES 
+ GUARDS (Auth User)
+ INTERCEPTORS (Token and Loading)
+ MODELS (ts)
+ COMPONENTS (html, css, ts)


## Technologies Used
* HTML
* CSS
* TypeScript
* Angular 17
* Bootstrap
* Loading ngx-spinner
* Git


## Configuring app.config.ts

```
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: loadingInterceptor,
      multi: true
    },
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
  ]
```


## Configuring angular.json

```
  "styles": [
      "src/styles.css",
      "node_modules/bootstrap/dist/css/bootstrap.min.css",
      "node_modules/ngx-spinner/animations/square-jelly-box.css"
  ],
  "scripts": [
    "node_modules/@popperjs/core/dist/umd/popper-base.min.js",
    "node_modules/bootstrap/dist/js/bootstrap.min.js"
  ]
```


# Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.7.
The main objective is project consume the Helpdesk API, that can find in this repository. 
In second moment to study and apply tecnologys of front-end.  


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.


## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.


## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
