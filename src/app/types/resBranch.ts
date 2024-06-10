class ResBranch {
    public id: number;

    constructor();

    constructor(id: number);

    constructor(id?: number) {
        this.id = id ?? 0;
    }
}
export default ResBranch;