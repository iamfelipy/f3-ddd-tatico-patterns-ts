import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class RegisterUserOnCrmWhenCustomerIsCreatedHandler
  implements EventHandlerInterface<CustomerCreatedEvent> {
  handle(event: CustomerCreatedEvent): void {
    const customer = event.eventData;
    console.log("Criando usuario "+ customer.name +" no crm.")
  }
    
}