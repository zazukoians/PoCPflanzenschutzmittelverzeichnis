/* eslint-disable dot-notation */
import {Injectable, inject} from '@angular/core';
import {Observable, map} from 'rxjs';
import {SparqlService} from '../../../../core/service/sparql/sparql.service';
import {getFirstLetterQuery} from './get-first-letter.query';
import {getProductsByLetterQuery} from './get-products-by-letter.query';

@Injectable({
	providedIn: 'root'
})
export class ProductFirstLetter {
	readonly #sparqlService = inject(SparqlService);

	getFirstLetters(): Observable<string[]> {
		const query = getFirstLetterQuery();

		return this.#sparqlService.select(query).pipe(map(results => results.map(result => result['firstLetter'].value ?? '')));
	}

	getProductsByLetter(firstLetter: string): Observable<Product[]> {
		const query = getProductsByLetterQuery(firstLetter);

		return this.#sparqlService.select(query).pipe(
			map(results =>
				results.map(result => ({
					iri: result['iri']?.value ?? '',
					label: result['label']?.value ?? '',
					productType: result['productType']?.value ?? '',
					federalAdmissionNumber: result['federalAdmissionNumber']?.value ?? ''
				}))
			)
		);
	}
}

export interface Product {
	iri: string;
	label: string;
	productType: string;
	federalAdmissionNumber: string;
}
