import {Routes} from '@angular/router';
import {Products} from './products';
import {FirstLetterProductTable} from './first-letter-product-table/first-letter-product-table';

export const routes: Routes = [
	{
		path: '',
		component: Products,
		children: [
			{path: '', component: undefined},
			{path: ':firstLetter', component: FirstLetterProductTable}
		]
	}
];
