import Address from "../../value-object/address";
import Customer from "../../entity/customer";
import NotifyTransporterWhenCustomerAddressChangedHandler from "./notify-transporter-when-customer-address-changed.handler";
import EventDispatcher from "../../../@shared/event/event-dispatcher";

describe("notify transporter when customer address changed handler tests", () => {
  it("should notify transporter when customer address is changed", () => {
    const eventDispatcher = EventDispatcher.getInstance();
    const eventHandler = new NotifyTransporterWhenCustomerAddressChangedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("CustomerAddressChanged", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerAddressChanged"][0]
    ).toMatchObject(eventHandler);

    const customer = new Customer('006', "Bond James")
    const address = new Address("Avenida Paulista", 1000, "01310-100", "São Paulo");
    customer.changeAddress(address)

    expect(spyEventHandler).toHaveBeenCalled();
    
  })
})

