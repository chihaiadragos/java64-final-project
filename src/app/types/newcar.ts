import Branch from "./branch";

class Banana {
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
export default Banana;