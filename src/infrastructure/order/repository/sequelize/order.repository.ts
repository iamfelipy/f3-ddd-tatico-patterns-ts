import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderModel from "./order.model";
import OrderItemModel from "./order-item.model";


export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }
  async update(entity: Order): Promise<void> {    

    // Note: item deletion is handled separately, as the item list is paginated
    
    await OrderModel.update({
      // id: entity.id,
      // customer_id: entity.customerId,
      total: entity.total(),
    }, {
      where: {
        id: entity.id
      }
    })

    // criar e atualizar orderItems

    const existingOrder = await OrderModel.findOne({
      where: {
        id: entity.id
      },
      include: ["items"]
    })

    const existingOrderItems = existingOrder.items

    // Update items that already exist

    const orderItemsToUpdate = entity.items.filter(orderItem => 
      existingOrderItems.some(item => item.id === orderItem.id)
    )

    if (orderItemsToUpdate.length > 0) {
      await Promise.all(orderItemsToUpdate.map(async (item) => {
        await OrderItemModel.update({
          // id: item.id,
          // name: item.name,
          // price: item.price,
          // product_id: item.productId,
          quantity: item.quantity,
        }, {
          where: {
            id: item.id
          }
        })
      }));
    }

    // Create new items

    const newOrderItems = entity.items.filter(orderItem => 
      existingOrderItems.every(item => item.id !== orderItem.id)
    )

    if(newOrderItems.length > 0) {
      await Promise.all(newOrderItems.map(item => OrderItemModel.create({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity,
        order_id: entity.id
      })))
    }

  }
  async find(id: string): Promise<Order> {
    const order = await OrderModel.findByPk(id, {
      include: ["items"]
    })

    const orderDomain = new Order(
      order.id, 
      order.customer_id, 
      order.items.map(orderItem => 
        new OrderItem(
          orderItem.id, 
          orderItem.name, 
          orderItem.price, 
          orderItem.product_id, 
          orderItem.quantity
        )
      )
    )

    return orderDomain
  }
  async findAll(): Promise<Order[]> {
    const orders = await OrderModel.findAll({ include: ["items"] });

    const orderDomain = orders.map(order => 
      new Order(
        order.id, 
        order.customer_id, 
        order.items.map(orderItem => 
          new OrderItem(
            orderItem.id, 
            orderItem.name, 
            orderItem.price, 
            orderItem.product_id, 
            orderItem.quantity
          )
        )
      )
    )

    return orderDomain
  }
}
