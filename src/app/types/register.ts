class RegisterClient {

    public firstName: string;
    public lastName: string;
    public address: string;
    public email: string;
    public password: string;
    public accountType: string;

    constructor(
        firstName: string,
        lastName: string,
        address: string,
        email: string,
        password: string,
        accountType: string
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.email = email;
        this.password = password;
        this.accountType = accountType;
    }

}
export default RegisterClient;