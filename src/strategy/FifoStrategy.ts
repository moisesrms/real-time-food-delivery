import { Order } from "src/entity/Order";
import { Strategy, TStrategyDelivered } from "./Strategy";

export class FifoStrategy extends Strategy {

  courierDispatched(): TStrategyDelivered {
    if (this.mapReadyOrders.size <= 0) return null;
    const arbitraryOrderIndex = Math.floor(Math.random() * this.mapReadyOrders.size);
    const arbitraryOrder = Array.from(this.mapReadyOrders.values())[arbitraryOrderIndex];
    arbitraryOrder.setAsDelivered();
    const earliestCourier = Array.from(this.mapCouriers.values())[0];
    earliestCourier.setOrderPickup();
    return [{ order: arbitraryOrder, courier: earliestCourier }];
  }

  orderPrepared(order: Order): TStrategyDelivered {
    if (this.mapCouriers.size <= 0) return null;
    const earliestCourier = Array.from(this.mapCouriers.values())[0];
    earliestCourier.setOrderPickup();
    order.setAsDelivered();
    return [{ order, courier: earliestCourier }];
  }

}
