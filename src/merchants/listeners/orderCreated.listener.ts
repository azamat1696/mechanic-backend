/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { OrderCreatedEvent } from '../events/orderCreated.event';

@Injectable()
export class OrderCreatedListener {
  @OnEvent('order.created', { async: true })
  handleOrderCreatedEvent(event: OrderCreatedEvent) {
    // handle and process "OrderCreatedEvent" event
    console.log('Listening!!!!!', event);
  }
}
