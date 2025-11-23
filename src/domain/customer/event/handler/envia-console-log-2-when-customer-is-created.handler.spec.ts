import EventDispatcher from "../../../@shared/event/event-dispatcher";
import Customer from "../../entity/customer";
import EnviaConsoleLog2Handler from "./envia-console-log-2-when-customer-is-created.handler";

describe("envia console log 2 when customer is created handler tests", () => {
  it("should log to console when customer is created", () => {
    const eventDispatcher = EventDispatcher.getInstance();
    const eventHandler = new EnviaConsoleLog2Handler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    new Customer('006', "Bond James")

    expect(spyEventHandler).toHaveBeenCalled();
  })
})

