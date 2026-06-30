import {Component, inject, input} from '@angular/core';
import {toObservable, toSignal} from '@angular/core/rxjs-interop';
import {TranslateModule} from '@ngx-translate/core';
import {of, switchMap} from 'rxjs';
import {Product, ProductFirstLetter} from '../service/product-first-letter/product-first-letter';

@Component({
	selector: 'app-first-letter-product-table',
	imports: [TranslateModule],
	templateUrl: './first-letter-product-table.html',
	styleUrl: './first-letter-product-table.scss'
})
export class FirstLetterProductTable {
	readonly firstLetter = input.required<string>();

	readonly #productFirstLetter = inject(ProductFirstLetter);

	readonly products = toSignal(
		toObservable(this.firstLetter).pipe(
			switchMap(letter => {
				if (!letter) {
					return of([] as Product[]);
				}
				return this.#productFirstLetter.getProductsByLetter(letter);
			})
		),
		{initialValue: [] as Product[]}
	);

	getProductTypeTranslationKey(productTypeUri: string): string {
		if (!productTypeUri) {
			return '';
		}
		const localName = productTypeUri.split('/').pop() || '';
		return `products.types.${localName}`;
	}
}
