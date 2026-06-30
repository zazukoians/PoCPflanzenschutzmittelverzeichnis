import {LOCALE_ID, NgModule, provideBrowserGlobalErrorListeners, provideZoneChangeDetection} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing-module';
import {App} from './app';
import {ObButtonModule, ObExternalLinkModule, ObHttpApiInterceptor, ObMasterLayoutModule, provideObliqueConfiguration} from '@oblique/oblique';
import {registerLocaleData} from '@angular/common';
import localeDECH from '@angular/common/locales/de-CH';
import localeFRCH from '@angular/common/locales/fr-CH';
import localeITCH from '@angular/common/locales/it-CH';
import {TranslateModule} from '@ngx-translate/core';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {Home} from './home/home';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';

registerLocaleData(localeDECH);
registerLocaleData(localeFRCH);
registerLocaleData(localeITCH);

@NgModule({
	declarations: [App, Home],
	imports: [
		BrowserModule,
		AppRoutingModule,
		ObMasterLayoutModule,
		ObButtonModule,
		TranslateModule,
		MatButtonModule,
		MatCardModule,
		MatIconModule,
		ObExternalLinkModule
	],
	providers: [
		provideBrowserGlobalErrorListeners(),
		provideZoneChangeDetection({eventCoalescing: true}),
		{provide: LOCALE_ID, useValue: 'de-CH'},
		provideObliqueConfiguration({
			accessibilityStatement: {
				applicationName: 'PoCPflanzenschutzmittelverzeichnis',
				conformity: 'none',
				createdOn: new Date('2026-06-30'),
				applicationOperator: 'Bundesamt für Lebensmittelsicherheit und Veterinärwesen ',
				contact: [{email: 'info@example.org'}, {email: 'support@example.org'}, {phone: '+41 79 123 45 67'}, {phone: '031 555 44'}]
			},
			hasLanguageInUrl: false
		}),
		{provide: HTTP_INTERCEPTORS, useClass: ObHttpApiInterceptor, multi: true},
		provideHttpClient(withInterceptorsFromDi())
	],
	bootstrap: [App]
})
export class AppModule {}
