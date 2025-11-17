import { Sequelize } from "sequelize-typescript";
import OrderRepository from "./order.repository";
import CustomerModel from "../sequelize/model/customer.model";
import OrderItemModel from "../sequelize/model/order-item.model";
import ProductModel from "../sequelize/model/product.model";
import OrderModel from "../sequelize/model/order.model";
import CustomerRepository from "./customer.repository";
import Customer from "../../../domain/entity/customer";
import Address from "../../../domain/entity/address";
import { Product } from "../../../domain/entity/product";
import ProductRepository from "./product.repository";
import OrderItem from "../../../domain/entity/order_item";
import Order from "../../../domain/entity/order";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([
      OrderModel,
      CustomerModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("123", "123", [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: "123",
          product_id: "123",
        },
      ],
    });
  });
  it("should update an existing order and its items", async () => {

    // create order

    let customerRepository = new CustomerRepository();
    let customer = new Customer("123", "Customer 1");
    let address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    let productRepository = new ProductRepository();
    let product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    let orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    let order = new Order("123", "123", [orderItem]);

    let orderRepository = new OrderRepository();
    await orderRepository.create(order);

    let orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: "123",
          product_id: "123",
        },
      ],
    });

    // update order

    // alterar produto existente
    orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      4
    );

    // criar um novo orderItem
    let productRepository2 = new ProductRepository();
    let product2 = new Product("124", "Product 2", 3);
    await productRepository2.create(product2);

    let orderItem2 = new OrderItem(
      "2",
      product2.name,
      product2.price,
      product2.id,
      2
    );

    order = new Order("123", "123", [orderItem, orderItem2]);

    orderRepository = new OrderRepository();
    await orderRepository.update(order);

    orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: "123",
          product_id: "123",
        },
        {
          id: orderItem2.id,
          name: orderItem2.name,
          price: orderItem2.price,
          quantity: orderItem2.quantity,
          order_id: "123",
          product_id: "124",
        },
      ],
    });

  });
  it("find a order", async () => {
    // Arrange
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );
    const order = new Order("123", "123", [orderItem]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    // Act
    const foundOrder = await orderRepository.find(order.id);

    // Assert
    expect(foundOrder).toBeInstanceOf(Order);
    expect(foundOrder.id).toBe(order.id);
    expect(foundOrder.customerId).toBe(order.customerId);
    expect(foundOrder.total()).toBe(order.total());
    expect(foundOrder.items.length).toBe(order.items.length);

    expect(foundOrder.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          productId: orderItem.productId,
          quantity: orderItem.quantity,
        }),
      ])
    );
  });
});
