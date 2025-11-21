import EventHandlerInterface from "../../@shared/event/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class EnviaConsoleLog1Handler
  implements EventHandlerInterface<CustomerCreatedEvent> {
  handle(event: CustomerCreatedEvent): void {
    const customer = event.eventData;
    console.log("Esse é o primeiro console.log do evento: CustomerCreated")
  }
    
}