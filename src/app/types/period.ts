class Period {
    public dateFrom: String;
    public dateTo: String;

    
  constructor();

  constructor(
    dateFrom: string,
    dateTo: string,
  );

    constructor(    
        dateFrom?: string,
        dateTo?: string
    ) {
        this.dateFrom = dateFrom ?? '';
        this.dateTo = dateTo ?? '';
    }
}
export default Period;