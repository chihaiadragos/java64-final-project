class UpdateStatus {
    public id: number;
    public status: string;

    constructor();

    constructor(id: number, status: string);

    constructor(id?: number, status?: string) {
        this.id = id ?? 0;
        this.status = status ?? '';
    }
}
export default UpdateStatus;