import {AppErrorType} from './app-error.enum';

export interface AppError {
	readonly originalError?: Error;
	readonly type: AppErrorType;
}
