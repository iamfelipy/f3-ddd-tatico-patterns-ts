import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import ProductModel from "../../../product/repository/sequelize/product.model";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";
import Product from "../../../../domain/product/entity/product";
import ProductRepository from "../../../product/repository/sequelize/product.repository";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import Order from "../../../../domain/checkout/entity/order";
import OrderModel from "./order.model";
import OrderItemModel from "./order-item.model";
import OrderRepository from "./order.repository";

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
  it("find all orders", async () => {
    // Arrange
    
    // first order
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

    // second order
    const customer2 = new Customer("456", "Customer 2");
    const address2 = new Address("Street 2", 2, "Zipcode 2", "City 2");
    customer2.changeAddress(address2);
    await customerRepository.create(customer2);

    const product2 = new Product("456", "Product 2", 20);
    await productRepository.create(product2);

    const orderItem2 = new OrderItem(
      "2",
      product2.name,
      product2.price,
      product2.id,
      4
    );
    const order2 = new Order("456", "456", [orderItem2]);
    // Note: can use the same repository instance for both orders
    await orderRepository.create(order2);

    // Act
    const foundOrders = await orderRepository.findAll();

    // Assert: check both orders are present
    expect(Array.isArray(foundOrders)).toBe(true);
    expect(foundOrders.length).toBe(2);

    const foundOrder1 = foundOrders.find(o => o.id === order.id);
    const foundOrder2 = foundOrders.find(o => o.id === order2.id);

    expect(foundOrder1).toBeDefined();
    expect(foundOrder2).toBeDefined();

    expect(foundOrder1.id).toBe(order.id);
    expect(foundOrder1.customerId).toBe(order.customerId);
    expect(foundOrder1.total()).toBe(order.total());
    expect(foundOrder1.items.length).toBe(order.items.length);
    expect(foundOrder1.items).toEqual(
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

    expect(foundOrder2.id).toBe(order2.id);
    expect(foundOrder2.customerId).toBe(order2.customerId);
    expect(foundOrder2.total()).toBe(order2.total());
    expect(foundOrder2.items.length).toBe(order2.items.length);
    expect(foundOrder2.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: orderItem2.id,
          name: orderItem2.name,
          price: orderItem2.price,
          productId: orderItem2.productId,
          quantity: orderItem2.quantity,
        }),
      ])
    );
  });
});
