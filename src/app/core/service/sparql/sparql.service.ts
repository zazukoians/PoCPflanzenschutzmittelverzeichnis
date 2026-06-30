import {Injectable, inject} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

import {Observable, catchError, map, of} from 'rxjs';

import {environment} from '../../../../environments/environment';
import {GlobalErrorHandlerService} from '../global-error-handler/global-error-handler.service';
import {EmptySparqlResult, SparqlResult, SparqlResultTerm, transformToRecords} from '../../model/sparql/sparql-result-json.model';
import {AppErrorType} from '../../model/app-error/app-error.enum';
import {AppError} from '../../model/app-error/app-error.model';

@Injectable({
	providedIn: 'root'
})
export class SparqlService {
	readonly #http = inject(HttpClient);
	readonly #globalErrorHandlerService = inject(GlobalErrorHandlerService);

	/**
	 * Execute a SPARQL SELECT query
	 *
	 * @param query The SPARQL SELECT query
	 * @returns an observable of the resulting bindings
	 */
	select(query: string): Observable<Record<string, SparqlResultTerm>[]> {
		const endpoint = environment.sparqlEndpoint.endpointUrl;
		const headers = new HttpHeaders({
			'Content-Type': 'application/x-www-form-urlencoded',
			Accept: 'application/sparql-results+json'
		});

		const body = new URLSearchParams();
		body.set('query', query);

		const options = {
			headers
		};

		return this.#http.post<SparqlResult>(endpoint, body.toString(), options).pipe(
			catchError((error: HttpErrorResponse) => {
				this._handleError(error);
				return of(EmptySparqlResult);
			}),
			map(response => {
				const results = transformToRecords(response);
				return results;
			})
		);
	}

	private _handleError(error: HttpErrorResponse): void {
		const httpStatus = error.status;

		if (httpStatus >= 500 && httpStatus < 600) {
			// SERVER ERROR
			const applicationError: AppError = {
				type: AppErrorType.ServerError,
				originalError: error
			};
			this.#globalErrorHandlerService.handleError(applicationError);
			return;
		}
		if (httpStatus >= 400 && httpStatus < 500) {
			if (error.error.message) {
				// stardog
				// copy the error object and stringify the error.error object
				const stardogHttpErrorJson = JSON.stringify(error, null, 2);
				const stardogHttpError = JSON.parse(stardogHttpErrorJson);
				stardogHttpError.error = JSON.stringify(error.error, null, 2);
				const applicationError: AppError = {
					type: AppErrorType.ClientError,
					originalError: stardogHttpError
				};
				this.#globalErrorHandlerService.handleError(applicationError);
				return;
			}
			const applicationError: AppError = {
				type: AppErrorType.ClientError,
				originalError: error
			};
			this.#globalErrorHandlerService.handleError(applicationError);
			return;
		}
	}
}
