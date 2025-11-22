import RepositoryInterface from "../../@shared/repository/repository-interface";
import Customer from "../entitty/customer";

export default interface CustomerRepositoryInterface
  extends RepositoryInterface<Customer> {}
