import { ApplicationConfig, importProvidersFrom, APP_INITIALIZER, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HttpClient, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../translate.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor]), withInterceptorsFromDi()),
    provideAnimations(),
    importProvidersFrom(
      ToastrModule.forRoot({
        positionClass: 'toast-bottom-right',
        timeOut:3000,
        closeButton: true,
        progressBar: true,
        preventDuplicates: true
      }),
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        }
      })
    ),
    {
      provide: APP_INITIALIZER,
      useFactory: () => {
        return async () => {
          const translate = inject(TranslateService);
          translate.addLangs(['en', 'uk']);
          translate.setDefaultLang('en');
          const savedLang = localStorage.getItem('lang');
          const browserLang = translate.getBrowserLang();
          const langToUse = savedLang || (browserLang?.match(/en|uk/) ? browserLang : 'en');
          await lastValueFrom(translate.use(langToUse));
        };
      },
      multi: true
    }
    
    ],
};