class Branch {
    public id: number;
    public city: string;
    public address: string;
  

    constructor();

    constructor(id: number, city: string, address: string);

    constructor(id?: number, city?: string, address?: string) {
        this.id = id ?? 0;
        this.city = city ?? '';
        this.address = address ?? '';
        // this.status = status ?? '';
    }
}
export default Branch;