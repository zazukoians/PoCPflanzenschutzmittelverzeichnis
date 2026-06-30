import {TestBed} from '@angular/core/testing';

import {ProductFirstLetter} from './product-first-letter';

describe('ProductFirstLetter', () => {
	let service: ProductFirstLetter;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(ProductFirstLetter);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
