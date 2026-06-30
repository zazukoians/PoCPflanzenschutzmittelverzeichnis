import {Component, inject, signal} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ObINavigationLink, ObMasterLayoutConfig} from '@oblique/oblique';

@Component({
	selector: 'app-root',
	templateUrl: './app.html',
	standalone: false,
	styleUrl: './app.scss'
})
export class App {
	readonly year = signal(new Date().getFullYear());
	readonly #masterLayoutConfig = inject(ObMasterLayoutConfig);
	readonly #translateService = inject(TranslateService);

	topNavigation = signal<ObINavigationLink[]>([
		{
			label: 'topNavigation.products',
			url: 'products',
			icon: 'overview'
		}
	]);
	constructor() {
		this.#translateService.addLangs(['en']);
		this.#masterLayoutConfig.header.isSticky = true;
		this.#masterLayoutConfig.footer.isCustom = true;
		this.#masterLayoutConfig.homePageRoute = 'products';
		this.#masterLayoutConfig.layout.hasMaxWidth = false;
		this.#masterLayoutConfig.locale.locales = ['de-CH', 'fr-CH', 'it-CH', 'en-GB'];
	}
}
