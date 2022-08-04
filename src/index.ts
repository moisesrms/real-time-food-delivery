import * as dotenv from 'dotenv';
import { StrategyFactory } from "./strategy/StrategyFactory";

import { Order } from "./entity/Order";
import { Kitchen } from "./entity/kitchen";
import { Courier } from "./entity/Courier";

import { OrderService } from "./services/OrderService";
import { Analyzer } from "./services/AnalyzerService";
import { DeliveryService, TOnDeliveryAll } from "./services/DeliveryService";

dotenv.config();

const selectedStrategy = process.env.STRATEGY;
const strategy = StrategyFactory.create(selectedStrategy.toUpperCase());

// Callback, executed when all orders are delivered
const onDeliveryAll: TOnDeliveryAll = (orders: Order[], couriers: Courier[]) => {
  console.log("\n \x1b[46m That's all folks! \x1b[0m \n");
  const analyzer = new Analyzer(orders, couriers);
  analyzer.average();
}

console.log('\n \x1b[46m Welcome to the delivery system! \x1b[0m \n');

const deliveryService = new DeliveryService(strategy, onDeliveryAll);
const kitchen = new Kitchen(deliveryService);
const orderService = new OrderService(kitchen, deliveryService);
orderService.run();
