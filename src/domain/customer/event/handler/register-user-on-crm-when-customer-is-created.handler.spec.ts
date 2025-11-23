import EventDispatcher from "../../../@shared/event/event-dispatcher";
import Customer from "../../entity/customer";
import RegisterUserOnCrmWhenCustomerIsCreatedHandler from "./register-user-on-crm-when-customer-is-created.handler";

describe("register user on crm when customer is created tests", () => {
  it("should register user on crm qhen customer is created",() => {
    const eventDispatcher = EventDispatcher.getInstance();
    const eventHandler = new RegisterUserOnCrmWhenCustomerIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    new Customer('007', "James Bonde")

    expect(spyEventHandler).toHaveBeenCalled();
  })
})

