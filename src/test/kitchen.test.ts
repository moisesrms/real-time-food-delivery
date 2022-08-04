jest.mock('../services/DeliveryService');

import { describe, it, expect } from '@jest/globals';
import { TOrderData } from '../data/OrderData';
import { Kitchen } from '../entity/kitchen';
import { Order } from '../entity/Order';
import { DeliveryService } from '../services/DeliveryService';


describe('Kitchen', () => {

  it('Should prepare the food at the correct time', async () => {
    const deliveryServerMock = new DeliveryService(null, null);
    const kitchen = new Kitchen(deliveryServerMock);
    const orderData: TOrderData = {
      id: 'id',
      name: 'name',
      prepTime: 3
    }
    const order = new Order(orderData);
    kitchen.pushOrder(order);
    expect(order.isReady()).toBeFalsy();
    await new Promise((r) => setTimeout(r, orderData.prepTime * 1000));
    expect(order.isReady()).toBeTruthy();
  });

})
