import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FirstLetterProductTable} from './first-letter-product-table';

describe('FirstLetterProductTable', () => {
	let component: FirstLetterProductTable;
	let fixture: ComponentFixture<FirstLetterProductTable>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [FirstLetterProductTable]
		}).compileComponents();

		fixture = TestBed.createComponent(FirstLetterProductTable);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
