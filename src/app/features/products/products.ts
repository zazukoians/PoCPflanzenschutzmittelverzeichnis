import {Component, OnInit, inject, signal} from '@angular/core';
import {ProductFirstLetter} from './service/product-first-letter/product-first-letter';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

@Component({
	selector: 'app-products',
	imports: [RouterLink, RouterLinkActive, RouterOutlet],
	templateUrl: './products.html',
	styleUrl: './products.scss'
})
export class Products implements OnInit {
	readonly #productFirstLetter = inject(ProductFirstLetter);
	firstLetter = signal<string[]>([]);

	ngOnInit(): void {
		this.#productFirstLetter.getFirstLetters().subscribe(letters => this.firstLetter.set(letters));
	}
}
