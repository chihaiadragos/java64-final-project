import Branch from "./branch";
import Car from "./car";
import Customer from "./customer";
import ResBranch from "./resBranch";
import ResCar from "./resCar";
import ResCustomer from "./resCustomer";

class Reservation {
  public id: number;
  public customer: ResCustomer | null;
  public car: ResCar | null;
  public dateFrom: String;
  public dateTo: String;
  public branch: ResBranch | null;
  public amount: number;

  constructor();

  constructor(
    id: number,
    customer: ResCustomer,
    car: ResCar,
    dateFrom: string,
    dateTo: string,
    branch: ResBranch,
    amount: number
  );

  constructor(
    id?: number,
    customer?: ResCustomer,
    car?: ResCar,
    dateFrom?: string,
    dateTo?: string,
    branch?: ResBranch,
    amount?: number
  ) {
    this.id = id ?? 0;
    this.customer = customer ?? null;
    this.car = car ?? null;
    this.dateFrom = dateFrom ?? '';
    this.dateTo = dateTo ?? '';
    this.branch = branch ?? null;
    this.amount = amount ?? 0;
  }
}
export default Reservation;