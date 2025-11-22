import EventInterface from "../../@shared/event/event.interface";
import Customer from "../entitty/customer";

export default class CustomerCreatedEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: any;

  constructor(eventData: any){
    this.dataTimeOccurred = new Date();
    this.eventData = eventData
  }
}