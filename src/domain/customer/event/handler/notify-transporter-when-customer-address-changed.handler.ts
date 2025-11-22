import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import { CustomerAddressChanged } from "../customer-address-changed.event";

export default class NotifyTransporterWhenCustomerAddressChangedHandler
  implements EventHandlerInterface<CustomerAddressChanged> {
  handle(event: CustomerAddressChanged): void {
    const customer = event.eventData;
    console.log(
      `Endereço do cliente: ${customer.id}, ${customer.name} alterado para: ${customer.Address.toString()}`
    );
  }
}