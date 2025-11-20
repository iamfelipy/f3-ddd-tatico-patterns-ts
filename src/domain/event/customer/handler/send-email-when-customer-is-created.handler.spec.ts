import Customer from "../../../entity/customer";
import EventDispatcher from "../../@shared/event/event-dispatcher";
import SendEmailWhenCustomerIsCreatedHandler from "./send-email-when-customer-is-created.handler";

describe("register user on crm when customer is created tests", () => {
  it("should register user on crm qhen customer is created",() => {
    const eventDispatcher = EventDispatcher.getInstance();
    const eventHandler = new SendEmailWhenCustomerIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    new Customer('006', "Bond James")

    expect(spyEventHandler).toHaveBeenCalled();
  })
})

