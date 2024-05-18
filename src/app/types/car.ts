import Branch from "./branch";

class Car {
    public id: number;
    public brand: String ;
    public model: String;
    public carBodyType: String;
    public year: number;
    public color: String;
    public mileage: number;
    public amount: number;
    public imageUrl: String;
    public branch: Branch  | null;

    constructor();

    constructor(
      id: number,
      brand: string,
      model: string,
      carBodyType: string,
      year: number,
      color: string,
      mileage: number,
      amount: number,
      imageUrl: string,
      branch: Branch 
    );
    
    constructor(
      id?: number,
      brand?: string,
      model?: string,
      carBodyType?: string,
      year?: number,
      color?: string,
      mileage?: number,
      amount?: number,
      imageUrl?: string,
      branch?: Branch
    ) {
      this.id = id ?? 0;
      this.brand = brand ?? '';
      this.model = model ?? '';
      this.carBodyType = carBodyType ?? '';
      this.year = year ?? 0;
      this.color = color ?? '';
      this.mileage = mileage ?? 0;
      this.amount = amount ?? 0;
      this.imageUrl = imageUrl ?? '';
      this.branch = branch ?? null;
    }
  }
export default Car;