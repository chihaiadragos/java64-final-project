import { NumberFormatStyle } from "@angular/common";

class ResCar {
    public id: number;
  

    constructor();

    constructor(id: number);

    constructor(id?: NumberFormatStyle) {
        this.id = id ?? 0;
    }
}
export default ResCar;