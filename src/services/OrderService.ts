import { Kitchen } from "../entity/kitchen";
import { Order } from "../entity/Order";

import { DeliveryService } from "src/services/DeliveryService";

import ordersData from '../data/dispatch_orders.json';

export class OrderService {

  static ordersDelay = 1000;
  static ordersAtATime = 2;

  private intervalId: NodeJS.Timer;
  private orders: Order[];
  private totalOrders: number;

  constructor(private readonly kitchen: Kitchen, private readonly deliveryService: DeliveryService) {
    this.orders = ordersData.map(orderData => new Order(orderData));
    this.totalOrders = this.orders.length;
  }

  private pushOrdersToKitchen() {
    for (let i = 0; i < OrderService.ordersAtATime; i++) {
      this.kitchen.pushOrder(this.orders.pop())
    }
  }

  // Iterate over all orders sending that to the kitchen 
  // respecting the interval and the amount of orders by interval
  run(): Promise<void> {
    return new Promise((resolve) => {
      this.intervalId = setInterval(() => {
        this.pushOrdersToKitchen();
        const noMoreOrdersToProcess = this.orders.length <= 0;
        if (noMoreOrdersToProcess) {
          this.deliveryService.notifyNoMoreOrders(this.totalOrders);
          clearInterval(this.intervalId);
          resolve();
        };
      }, OrderService.ordersDelay);
    })
  }

}
