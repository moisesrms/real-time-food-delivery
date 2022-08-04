import crypto from 'crypto';

import { Order } from './Order';

export class Courier {
  private id: string;
  private arrived: boolean;
  private arrivalAt: number;
  private orderPickupAt: number;

  constructor(private order: Order) {
    this.id = crypto.randomUUID();
    this.arrived = false;
  }

  getId() {
    return this.id;
  }

  getMatchedOrder() {
    return this.order;
  }

  setAsArrived() {
    this.arrived = true;
    this.arrivalAt = new Date().getTime();
  }

  setOrderPickup() {
    this.orderPickupAt = new Date().getTime();
  }

  hasArrived() {
    return this.arrived;
  }

  isEqual(courier: Courier) {
    return this.id === courier.getId();
  }

  getElapsedTime(): number {
    return this.hasArrived() ? (this.orderPickupAt - this.arrivalAt) : 0;
  }

}
