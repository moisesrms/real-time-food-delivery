import { Order } from "src/entity/Order";
import { Strategy, TStrategyDelivered } from "./Strategy";

export class MatchedStrategy extends Strategy {

  courierDispatched(): TStrategyDelivered {
    if (this.mapReadyOrders.size <= 0) return null;
    const orders = Array.from(this.mapReadyOrders.values());
    const delivered: TStrategyDelivered = [];
    this.mapCouriers.forEach((courier) => {
      const matchedOrder = orders.find(order => order.isEqual(courier.getMatchedOrder()));
      if (!matchedOrder) return;
      courier.setOrderPickup();
      matchedOrder.setAsDelivered();
      delivered.push({ order: matchedOrder, courier });
    })
    return delivered;
  }

  orderPrepared(_: Order): TStrategyDelivered {
    if (this.mapCouriers.size <= 0) return null;
    const delivered: TStrategyDelivered = [];
    const couriers = Array.from(this.mapCouriers.values());
    this.mapReadyOrders.forEach(order => {
      const matchedCourier = couriers.find(courier => order.isEqual(courier.getMatchedOrder()));
      if (!matchedCourier) return;
      matchedCourier.setOrderPickup();
      order.setAsDelivered();
      delivered.push({ order, courier: matchedCourier });
    })
    return delivered;
  }

}

