import Branch from "./branch";
import Car from "./car";
import Customer from "./customer";

class Reservation {
  public id: number;
  public customer: Customer | null;
  public car: Car | null;
  public dateFrom: String;
  public dateTo: String;
  public branchPickUp: Branch | null;
  public branchDropOff: Branch | null;
  public amount: number;

  constructor();

  constructor(
    id: number,
    customer: Customer,
    car: Car,
    dateFrom: string,
    dateTo: string,
    branchPickUp: Branch,
    branchDropOff: Branch,
    amount: number
  );

  constructor(
    id?: number,
    customer?: Customer,
    car?: Car,
    dateFrom?: string,
    dateTo?: string,
    branchPickUp?: Branch,
    branchDropOff?: Branch,
    amount?: number
  ) {
    this.id = id ?? 0;
    this.customer = customer ?? null;
    this.car = car ?? null;
    this.dateFrom = dateFrom ?? '';
    this.dateTo = dateTo ?? '';
    this.branchPickUp = branchPickUp ?? null;
    this.branchDropOff = branchDropOff ?? null;
    this.amount = amount ?? 0;
  }
}
export default Reservation;