import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { routes } from './app.routes';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    //  importProvidersFrom([BrowserAnimationsModule])
    ]
};



// import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
// import { provideRouter } from '@angular/router';

// import { routes } from './app.routes';

// export const appConfig: ApplicationConfig = {
//   providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
// };
