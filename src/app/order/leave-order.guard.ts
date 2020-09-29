import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { OrderComponent } from './order.component';

export class LeaveOrderGuard implements CanDeactivate<OrderComponent> {

    canDeactivate(order: OrderComponent, route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!order.isOrderCompleted()) {
            return window.confirm('Deseja realmente desistir da compra?');
        }

        return true;
    }

}
