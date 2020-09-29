import { LoginService } from './security/login/login.service';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { NotificationService } from './shared/messages/notification.service';

@Injectable()
export class ApplicationErrorHandler extends ErrorHandler {

    constructor(private ns: NotificationService, private injector: Injector) {
        super();
    }

    handleError(errorResponse: HttpErrorResponse | any) {
        if (errorResponse instanceof HttpErrorResponse) {
            const message = errorResponse.error.message;

            switch (errorResponse.status) {
                case 400:
                    this.ns.notify(message || 'Dados inválidos.');
                    break;
                case 401:
                    this.injector.get(LoginService).handleLogin();
                    break;
                case 403:
                    this.ns.notify(message || 'Não autorizado.');
                    break;
                case 404:
                    this.ns.notify(message || 'Recurso não encontrado. Verifique o console para mais detalhes.');
                    break;
                default:
                    this.ns.notify(message);
                    break;
            }
        }

        super.handleError(errorResponse);
    }

}
