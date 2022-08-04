import { Courier } from "src/entity/Courier";
import { Order } from "src/entity/Order";

export type TStrategyDelivered = [{ order: Order, courier: Courier }?] | null;

export abstract class Strategy {

  protected mapReadyOrders: Map<string, Order>;
  protected mapCouriers: Map<string, Courier>;

  setQueues(readyOrders: Map<string, Order>, couriers: Map<string, Courier>) {
    this.mapReadyOrders = readyOrders;
    this.mapCouriers = couriers;
  }

  abstract courierDispatched(): TStrategyDelivered;

  abstract orderPrepared(order: Order): TStrategyDelivered;

}
