import { DeliveryService } from "src/services/DeliveryService";
import { Order } from "./Order";

export class Kitchen {

  constructor(private readonly deliveryService: DeliveryService) { }

  private finishOrder(order: Order) {
    console.log(`\x1b[95m Order prepared: ${order.getName()} \x1b[0m`)
    order.setAsReady();
    this.deliveryService.dispatchReadyOrder(order);
  }

  pushOrder(order: Order): void {
    if (!order) return;
    console.log(`\x1b[34m Order received: ${order.getName()} \x1b[0m`)
    this.deliveryService.dispatchCourier(order);
    setTimeout(() => this.finishOrder(order), order.getPreparationTime());
  }
}

