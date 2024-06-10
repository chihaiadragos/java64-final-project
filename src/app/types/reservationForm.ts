import Branch from "./branch";
import Car from "./car";
import Customer from "./customer";

class ReservationForm {
  public id: number;
  public customer: Customer | null;
  public car: Car | null;
  public dateFrom: String;
  public dateTo: String;
  public branch: Branch | null;
  public reservationStatus: String;

  public amount: number;

  constructor();

  constructor(
    id: number,
    customer: Customer,
    car: Car,
    dateFrom: string,
    dateTo: string,
    branch: Branch,
    amount: number,
    reservationStatus: string
  );

  constructor(
    id?: number,
    customer?: Customer,
    car?: Car,
    dateFrom?: string,
    dateTo?: string,
    branch?: Branch,
    amount?: number,
    reservationStatus?: string
  ) {
    this.id = id ?? 0;
    this.customer = customer ?? null;
    this.car = car ?? null;
    this.dateFrom = dateFrom ?? '';
    this.dateTo = dateTo ?? '';
    this.branch = branch ?? null;
    this.amount = amount ?? 0;
    this.reservationStatus = reservationStatus ?? '';
  }
}
export default ReservationForm;