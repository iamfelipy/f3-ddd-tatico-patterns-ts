import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class SendEmailWhenCustomerIsCreatedHandler
  implements EventHandlerInterface<CustomerCreatedEvent> {
  handle(event: CustomerCreatedEvent): void {
    const customer = event.eventData;
    console.log("Enviano email para o novo usuario: " + customer.name)
  }
    
}