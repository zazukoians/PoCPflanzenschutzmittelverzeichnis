import {Injectable, inject} from '@angular/core';

import {TranslateService} from '@ngx-translate/core';

import {ObENotificationType, ObINotification, ObNotificationService} from '@oblique/oblique';
import {AppError} from '../../model/app-error/app-error.model';
import {AppErrorType} from '../../model/app-error/app-error.enum';

@Injectable({
	providedIn: 'root'
})
export class GlobalErrorHandlerService {
	readonly #notificationService = inject(ObNotificationService);
	readonly #translateService = inject(TranslateService);

	handleError(error: AppError): void {
		console.error('GlobalErrorHandlerService#handleError: error', JSON.stringify(error, null, 2));

		if (error.type === AppErrorType.ServerError) {
			const title = this.#translateService.instant('ERROR_HANDLING.SERVER_ERROR_TITLE');
			const message = this.#translateService.instant('ERROR_HANDLING.SERVER_ERROR_MESSAGE');
			const notification: ObINotification = {
				type: ObENotificationType.ERROR,
				message,
				title,
				timeout: 10000,
				groupSimilar: true
			};
			this.#notificationService.error(notification);
			return;
		}

		if (error.type === AppErrorType.ClientError) {
			const title = this.#translateService.instant('ERROR_HANDLING.CLIENT_ERROR_TITLE');
			const message = this.#translateService.instant('ERROR_HANDLING.CLIENT_ERROR_MESSAGE');

			const notification: ObINotification = {
				type: ObENotificationType.ERROR,
				message,
				title,
				timeout: 10000,
				groupSimilar: true
			};
			this.#notificationService.error(notification);
			return;
		}
	}
}
