import { TOrderData } from "src/data/OrderData";

export class Order {

  private delivered: boolean;
  private ready: boolean;
  private readyAt: number;
  private orderPickupAt: number;

  constructor(
    private readonly order: TOrderData
  ) {
    this.delivered = false;
    this.ready = false;
  }

  setAsDelivered(): void {
    this.delivered = true;
    this.orderPickupAt = new Date().getTime();
  }

  setAsReady(): void {
    this.ready = true;
    this.readyAt = new Date().getTime();
  }

  isDelivered(): boolean {
    return this.delivered;
  }

  isReady(): boolean {
    return this.ready;
  }

  getPreparationTime(): number {
    return this.order.prepTime * 1000;
  }

  getId(): string {
    return this.order.id;
  }

  getName(): string {
    return this.order.name;
  }

  isEqual(order: Order): boolean {
    return this.order.id === order.getId();
  }

  getElapsedTime(): number {
    return this.isDelivered() ? (this.orderPickupAt - this.readyAt) : 0;
  }
}
