import Customer from "./entity/customer";
import Address from "./entity/address";
import OrderItem from "./entity/order_item";
import Order from "./entity/order";

// Agregado com relação de id
let customer = new Customer("123", "Felipy C")
const address = new Address("Rua tres", 3, "12345-678", "Sao Paulo")
customer.Address = address
customer.activate()

// Agregado com relação de Objeto
const item1  = new OrderItem("1", "item 1", 10);
const item2  = new OrderItem("2", "item 2", 15);
const order = new Order("1", "123", [item1, item2])