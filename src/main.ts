import Order from "./domain/checkout/entity/order";
import OrderItem from "./domain/checkout/entity/order_item";
import Customer from "./domain/customer/entity/customer";
import Address from "./domain/customer/value-object/address";

// Agregado com relação de id
let customer = new Customer("123", "Felipy C")
const address = new Address("Rua tres", 3, "12345-678", "Sao Paulo")
customer.Address = address
customer.activate()

// Agregado com relação de Objeto
const item1  = new OrderItem("1", "item 1", 10, "prod1", 1);
const item2  = new OrderItem("2", "item 2", 15, "prod2", 1);
const order = new Order("1", "123", [item1, item2])