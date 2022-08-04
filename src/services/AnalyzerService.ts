import { Courier } from "src/entity/Courier";
import { Order } from "src/entity/Order";

export class Analyzer {

  constructor(private readonly orders: Order[], private readonly couriers: Courier[]) { }

  async average() {
    let averageFoodWaitTime = this.orders.reduce((acc, cur) => acc += cur.getElapsedTime(), 0);
    let averageCourierWaitTime = this.couriers.reduce((acc, cur) => acc += cur.getElapsedTime(), 0);

    averageFoodWaitTime /= this.orders.length;
    averageCourierWaitTime /= this.couriers.length;

    const selectedStrategy = process.env.STRATEGY;
    console.log(` \x1b[33m Selected strategy: ${selectedStrategy.toUpperCase()} \x1b[0m`);

    console.log(` \x1b[36m Average food wait time: ${averageFoodWaitTime.toFixed(2)} \x1b[0m`);
    console.log(` \x1b[32m Average courier wait time: ${averageCourierWaitTime.toFixed(2)} \x1b[0m \n`);
  }
}
