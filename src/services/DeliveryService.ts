import { Strategy, TStrategyDelivered } from "src/strategy/Strategy";
import { Courier } from "../entity/Courier";
import { Order } from "../entity/Order";

export type TOnDeliveryAll = (orders: Order[], couriers: Courier[]) => void

export class DeliveryService {

  // Courier time interval to be ready
  static minTime = 3000;
  static maxTime = 15000;

  // Queues
  private mapReadyOrders: Map<string, Order> = new Map();
  private mapCouriers: Map<string, Courier> = new Map();
  private mapOrdersDelivered: Map<string, Order> = new Map();
  private mapCouriersOrderPickup: Map<string, Courier> = new Map();

  private noMoreOrders = false;
  private totalOrders: number;

  constructor(private readonly strategy: Strategy, private readonly onDeliveryAll: TOnDeliveryAll) {
    this.strategy.setQueues(this.mapReadyOrders, this.mapCouriers);
  }

  // Used to calculate an random delay to set the couriers as arrived after they've been dispatched
  private getRandomDelay() {
    return Math.floor(Math.random() * (DeliveryService.maxTime - DeliveryService.minTime + 1) + DeliveryService.minTime);
  }

  private isAllDelivered(): boolean {
    return this.noMoreOrders && this.mapOrdersDelivered.size === this.totalOrders;
  }

  private deliverOrders(delivered: TStrategyDelivered) {
    if (!delivered) return;
    delivered.forEach(({ order, courier }) => {
      console.log(`\x1b[92m Order picked up: ${order.getName()} \x1b[0m`)
      this.mapOrdersDelivered.set(order.getId(), order);
      this.mapCouriersOrderPickup.set(courier.getId(), courier);
      this.mapReadyOrders.delete(order.getId());
      this.mapCouriers.delete(courier.getId());
      if (this.isAllDelivered()) {
        const ordersDelivered = Array.from(this.mapOrdersDelivered.values());
        const couriers = Array.from(this.mapCouriersOrderPickup.values());
        this.onDeliveryAll(ordersDelivered, couriers);
      };
    });
  }

  async dispatchCourier(order: Order): Promise<void> {
    console.log('\x1b[33m Courier dispatched! \x1b[0m');
    const delay = this.getRandomDelay();
    const newCourier = new Courier(order);
    setTimeout(() => {
      console.log('\x1b[96m Courier arrived! \x1b[0m')
      newCourier.setAsArrived();
      this.mapCouriers.set(newCourier.getId(), newCourier);
      const delivered = this.strategy.courierDispatched();
      this.deliverOrders(delivered)
    }, delay);
  }

  dispatchReadyOrder(order: Order) {
    this.mapReadyOrders.set(order.getId(), order);
    const delivered = this.strategy.orderPrepared(order);
    this.deliverOrders(delivered)
  }

  notifyNoMoreOrders(totalOrders: number) {
    this.noMoreOrders = true;
    this.totalOrders = totalOrders;
  }
}
