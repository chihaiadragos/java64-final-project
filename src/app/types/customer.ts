class Customer {
    public id: number;
    public firstName: String;
    public lastName: String;
    public email: String;
    public address: String;
    public image: File | null;
    public balance: number;

    constructor();

    constructor(
        id: number,
        firstName: string,
        lastName: string,
        email: string,
        address: string,
        image: File | null,
        balance: number
    );

    constructor(
        id?: number,
        firstName?: string,
        lastName?: string,
        email?: string,
        address?: string,
        image?: File | null,
        balance?: number
    ) {
        this.id = id ?? 0;
        this.firstName = firstName ?? '';
        this.lastName = lastName ?? '';
        this.email = email ?? '';
        this.address = address ?? '';
        this.image = image ?? null;
        this.balance = balance ?? 0;

    }
}
export default Customer;