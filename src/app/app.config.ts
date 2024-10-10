import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TokenInterceptor } from './services/interceptors/token.interceptor';



export const appConfig: ApplicationConfig = {
  providers: [
    //The order matters here! First import your "old" interceptors 
    //then just make sure that withInterceptorsFromDi is loaded after those
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
  ]
};
